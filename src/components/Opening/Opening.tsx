"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./Opening.module.scss";

const STORAGE_KEY = "lt-opening-seen";

/**
 * Corre de forma síncrona mientras el navegador lee el HTML (antes del primer
 * pintado): si es la primera visita de la sesión y no se pidió reducir
 * animaciones, marca <html data-intro="play">. Todo el CSS de la animación
 * depende de ese atributo, así que sin JS (o en navegación interna) no se ve.
 * Ver node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
const bootScript = `try{if(!sessionStorage.getItem("${STORAGE_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="play"}}catch(e){}`;

function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type OpeningProps = {
  t: Dictionary["opening"];
  /** Misma foto que el hero, para que el final de la animación empalme con él */
  image: string;
};

/**
 * Animación de bienvenida del home (una vez por sesión):
 * fondo oscuro → aparece el nombre → una ventana con forma de torre crece
 * desde abajo → se expande hasta la foto del hero → se funde y arrancan
 * los textos del hero. Click o cualquier tecla la saltea.
 */
export default function Opening({ t, image }: OpeningProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const win = windowRef.current;
    if (html.dataset.intro !== "play" || !root || !win) return;

    window.scrollTo(0, 0);
    // Frena el scroll (Lenis escucha este estilo inline)
    html.style.overflow = "hidden";

    const reveal = () => {
      if (html.dataset.intro !== "play") return;
      html.dataset.intro = "reveal";
      html.style.overflow = "";
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    };
    const finish = () => {
      reveal();
      html.dataset.intro = "done";
    };

    const onWindowEnd = (e: AnimationEvent) => e.target === win && reveal();
    const onRootEnd = (e: AnimationEvent) => e.target === root && finish();
    const onKey = () => reveal();

    win.addEventListener("animationend", onWindowEnd);
    root.addEventListener("animationend", onRootEnd);
    root.addEventListener("pointerdown", reveal);
    window.addEventListener("keydown", onKey);
    // Red de seguridad por si algún animationend no llega
    const fallback = window.setTimeout(finish, 9000);

    return () => {
      win.removeEventListener("animationend", onWindowEnd);
      root.removeEventListener("animationend", onRootEnd);
      root.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(fallback);
      html.style.overflow = "";
    };
  }, []);

  return (
    <>
      <InlineScript html={bootScript} />
      {/* Decorativa: el mismo contenido está en el hero */}
      <div ref={rootRef} className={styles.opening} aria-hidden="true">
        <div ref={windowRef} className={styles.window}>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className={styles.photo}
          />
          <span className={styles.scrim} />
        </div>

        <div className={styles.brand}>
          <span className={styles.mark} />
          <p className={styles.title}>
            <span className={styles.line}>
              <span className={styles.lineInner}>{t.titleLine1}</span>
            </span>
            <span className={styles.line}>
              <span className={styles.lineInner}>{t.titleLine2}</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
