"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
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
  /** "absolute": flota sobre el hero. "sticky": queda fija al hacer scroll. */
  position?: "absolute" | "sticky";
};

export default function Navbar({ position = "absolute" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  // TODO: conectar con i18n cuando se defina la estrategia de idiomas
  const [lang, setLang] = useState<Lang>("es");

  // Bloquea el scroll y cierra con Escape mientras el menú mobile está abierto
  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 1200px)");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => desktop.matches && setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  const langSwitch = (
    <div className={styles.lang} role="group" aria-label="Idioma">
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
    <header className={`${styles.header} ${styles[position]}`} data-open={open}>
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

        <div className={styles.actions}>
          {langSwitch}
          <Link href={CTA.href} className={styles.cta}>
            {CTA.label}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      <div id="mobile-menu" className={styles.panel} aria-hidden={!open} inert={!open}>
        <ul className={styles.panelLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.panelLink} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.panelFooter}>
          {langSwitch}
          <Link href={CTA.href} className={styles.panelCta} onClick={close}>
            {CTA.label}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
