"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
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

  // Foco: al abrir va al botón de cerrar; al cerrar vuelve al botón de menú
  useEffect(() => {
    if (isOpen) closeRef.current?.focus({ preventScroll: true });
    else if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = isOpen;
  }, [isOpen]);

  const close = () => setIsOpen(false);

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
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
          onClick={() => setIsOpen(true)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Menú mobile: panel lateral que entra desde la derecha */}
      <div
        className={[styles.backdrop, isOpen && styles.backdropOpen].filter(Boolean).join(" ")}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={[styles.drawer, isOpen && styles.drawerOpen].filter(Boolean).join(" ")}
        inert={!isOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menú</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Cerrar menú"
            onClick={close}
          >
            <span />
            <span />
          </button>
        </div>

        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ "--i": i } as CSSProperties}>
              <Link href={link.href} onClick={close}>
                <span className={styles.drawerIndex}>{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter} style={{ "--i": NAV_LINKS.length } as CSSProperties}>
          {langSwitch()}
          <Link href={CTA.href} className={styles.drawerCta} onClick={close}>
            {CTA.label}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
