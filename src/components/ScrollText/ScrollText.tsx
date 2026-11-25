"use client";

import { useRef, type CSSProperties } from "react";
import { prefersReducedMotion, useScrollFrame } from "@/lib/useScrollFrame";
import styles from "./ScrollText.module.scss";

type ScrollTextProps = {
  /**
   * Texto completo. Lo que va entre *asteriscos* se muestra en itálica y
   * cada salto de línea (\n) empieza un renglón nuevo.
   */
  text: string;
  className?: string;
};

type Word = { chars: string[]; em: boolean; breakAfter?: boolean };

/** Separa el texto en palabras (respetando los tramos en *itálica*) */
function parse(text: string): Word[] {
  const words: Word[] = [];
  text.split("\n").forEach((line, l, lines) => {
    line.split(/(\*[^*]+\*)/).forEach((chunk) => {
      const em = chunk.startsWith("*") && chunk.endsWith("*");
      const clean = em ? chunk.slice(1, -1) : chunk;
      clean
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => words.push({ chars: Array.from(w), em }));
    });
    if (l < lines.length - 1 && words.length) words[words.length - 1].breakAfter = true;
  });
  return words;
}

/**
 * Texto que se va "encendiendo" letra por letra a medida que se scrollea
 * (y se apaga al volver). JS solo escribe el progreso --p (0 a 1) en el
 * párrafo; cada letra calcula su opacidad en CSS según su posición --i.
 * Los lectores de pantalla leen el texto completo, sin partir.
 */
export default function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = parse(text);
  const total = words.reduce((n, w) => n + w.chars.length, 0);
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");

  useScrollFrame(
    ref,
    (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Empieza cuando el texto asoma por abajo (85% de la pantalla) y
      // termina cuando su última línea llega a un poco más arriba de la mitad.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const progress = (start - rect.top) / (start - end + rect.height);
      el.style.setProperty("--p", Math.max(0, Math.min(1, progress)).toFixed(4));
    },
    {
      whileVisible: true,
      skip: prefersReducedMotion,
      onSkip: (el) => el.style.setProperty("--p", "1"),
    },
  );

  let index = 0;

  return (
    <p ref={ref} className={[styles.text, className].filter(Boolean).join(" ")} style={{ "--n": total } as CSSProperties}>
      <span className={styles.srOnly}>{plain}</span>
      <span aria-hidden="true">
        {words.map((word, w) => {
          const letters = word.chars.map((char) => (
            <span key={index} className={styles.char} style={{ "--i": index++ } as CSSProperties}>
              {char}
            </span>
          ));
          return (
            <span key={w}>
              <span className={styles.word}>{word.em ? <em>{letters}</em> : letters}</span>
              {word.breakAfter ? <br /> : " "}
            </span>
          );
        })}
      </span>
    </p>
  );
}
