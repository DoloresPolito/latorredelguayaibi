"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Logo from "@/components/Logo/Logo";
import styles from "./Navbar.module.scss";

const NAV_LINKS = [
  { label: "La Torre", href: "/la-torre" },
  { label: "Habitaciones", href: "/habitaciones" },
  { label: "Gastronomía", href: "/gastronomia" },
  { label: "Entorno", href: "/entorno" },
  { label: "Nuestra historia", href: "/nuestra-historia" },
];

const CTA = { label: "Consultar disponibilidad", href: "/reservas" };

type Lang = "es" | "en";

type NavbarProps = {
  /**
   * "top": fija arriba desde el principio, flotando sobre el contenido (default).
   * "bottom": va en el DOM justo después del hero. Arranca abajo, sobre el borde
   *           inferior del hero; al scrollear sube con él y queda fija arriba.
   */
  variant?: "top" | "bottom";
};

export default function Navbar({ variant = "top" }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // TODO: conectar con i18n cuando se defina la estrategia de idiomas
  const [lang, setLang] = useState<Lang>("es");

  // Detecta cuando la barra llegó arriba y quedó fija (sticky)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setIsStuck(el.getBoundingClientRect().top <= top + 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Con el menú abierto se frena el scroll. Se bloquea en <html> y no en
  // <body>: si el body pasa a tener su propio scroll, la barra sticky se va.
  useEffect(() => {
    if (!isOpen) return;

    const desktop = window.matchMedia("(min-width: 1200px)");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => desktop.matches && setIsOpen(false);

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  // El menú se abre como un círculo que crece desde el botón. Como la barra
  // puede estar abajo (sobre el hero) o arriba (fija), se mide al abrir.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const header = ref.current;
    if (!isOpen && header) {
      const btn = event.currentTarget.getBoundingClientRect();
      const bar = header.getBoundingClientRect();
      const barAtBottom = bar.top > window.innerHeight / 2;
      header.style.setProperty("--menu-x", `${btn.left + btn.width / 2}px`);
      header.style.setProperty("--menu-y", `${btn.top + btn.height / 2}px`);
      header.style.setProperty("--menu-pt", barAtBottom ? "0px" : `${bar.bottom}px`);
      header.style.setProperty("--menu-pb", barAtBottom ? `${window.innerHeight - bar.top}px` : "0px");
    }
    setIsOpen((open) => !open);
  };

  const langSwitch = (className?: string) => (
    <div className={[styles.lang, className].filter(Boolean).join(" ")} role="group" aria-label="Idioma">
      {(["es", "en"] as const).map((code, i) => (
        <span key={code} className={styles.langItem}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            className={styles.langButton}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <header
      ref={ref}
      className={[styles.header, styles[variant], isStuck && styles.stuck].filter(Boolean).join(" ")}
    >
      <nav className={styles.bar} aria-label="Principal">
        <Link href="/" className={styles.brand} aria-label="La Torre del Guayaibí — Inicio" onClick={close}>
          <Logo />
        </Link>

        <span className={styles.separator} aria-hidden="true" />

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {langSwitch(styles.langDesktop)}

        <Link href={CTA.href} className={styles.cta}>
          {CTA.label}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={toggle}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={[styles.menu, isOpen && styles.menuOpen].filter(Boolean).join(" ")}
        inert={!isOpen}
      >
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ "--i": i } as CSSProperties}>
              <Link href={link.href} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.menuFooter} style={{ "--i": NAV_LINKS.length } as CSSProperties}>
          {langSwitch()}
          <Link href={CTA.href} className={styles.menuCta} onClick={close}>
            {CTA.label}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
