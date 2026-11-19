"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Logo from "@/components/Logo/Logo";
import {
  locales,
  localizePath,
  switchLocalePath,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { CTA_HREF, NAV_LINKS } from "@/config/navigation";
import styles from "./Navbar.module.scss";


type NavbarProps = {
  lang: Locale;
  t: Dictionary["nav"];
  /**
   * "top": fija arriba desde el principio, flotando sobre el contenido (default).
   * "bottom": va en el DOM justo después del hero. Arranca abajo, sobre el borde
   *           inferior del hero; al scrollear sube con él y queda fija arriba.
   */
  variant?: "top" | "bottom";
};

export default function Navbar({ lang, t, variant = "top" }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isOnDark, setIsOnDark] = useState(false);
  const [isOnSplit, setIsOnSplit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Detecta cuando la barra llegó arriba y quedó fija (sticky)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setIsStuck(el.getBoundingClientRect().top <= top + 1);
      // Achique del logo (home nuevo): 0 arriba de todo → 1 a los 240px de
      // scroll, con una curva suave. Lo usa el CSS como --shrink.
      const t = Math.min(1, window.scrollY / 240);
      el.style.setProperty("--shrink", (t * t * (3 - 2 * t)).toFixed(4));

      // ¿La barra está sobre una sección oscura? (marcadas con data-nav-theme="dark")
      const rect = el.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      setIsOnDark(
        Array.from(document.querySelectorAll('[data-nav-theme="dark"]')).some((section) => {
          const r = section.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        }),
      );

      // ¿Está sobre una sección partida en oscuro | claro? (data-nav-split =
      // dónde cae el corte, de 0 a 1 del ancho; solo desde lg, en mobile el
      // corte es horizontal). La pastilla pasa a vidrio transparente y cada
      // link / el isotipo toma el color según el lado del corte en que queda.
      const split = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-split]")).find(
        (section) => {
          const r = section.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        },
      );
      let splitX = -1;
      if (split && window.matchMedia("(min-width: 1024px)").matches) {
        const r = split.getBoundingClientRect();
        splitX = r.left + r.width * Number(split.dataset.navSplit);
      }
      setIsOnSplit(splitX >= 0);
      el.querySelectorAll<HTMLElement>("[data-split-target]").forEach((node) => {
        const b = node.getBoundingClientRect();
        node.toggleAttribute("data-over-dark", splitX >= 0 && b.left + b.width / 2 < splitX);
      });
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
    <div className={[styles.lang, className].filter(Boolean).join(" ")} role="group" aria-label={t.language}>
      {locales.map((code, i) => (
        <span key={code} className={styles.langItem}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <Link
            href={switchLocalePath(pathname, code)}
            className={styles.langButton}
            aria-current={lang === code ? "true" : undefined}
            hrefLang={code}
            lang={code}
            scroll={false}
            onClick={close}
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );

  const href = (path: string) => localizePath(lang, path);
  // Sección actual (también sus subpáginas), para marcarla en la barra
  const isCurrent = (path: string) =>
    pathname === href(path) || pathname.startsWith(`${href(path)}/`);

  return (
    <header
      ref={ref}
      className={[styles.header, styles[variant], isStuck && styles.stuck, isOnDark && styles.onDark, isOnSplit && styles.onSplit]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className={styles.bar} aria-label={t.ariaLabel}>
        <Link href={href("/")} className={styles.brand} aria-label={t.home} onClick={close} data-split-target>
          <Logo nameClassName={styles.logoName} markClassName={styles.logoMark} />
        </Link>

        <span className={styles.separator} aria-hidden="true" />

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={href(link.href)}
                className={styles.link}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                data-split-target
              >
                {t.links[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        {langSwitch(styles.langDesktop)}

        <Link href={href(CTA_HREF)} className={styles.cta}>
          {t.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={t.openMenu}
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
        aria-label={t.menu}
        data-lenis-prevent
        className={[styles.drawer, isOpen && styles.drawerOpen].filter(Boolean).join(" ")}
        inert={!isOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>{t.menu}</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label={t.closeMenu}
            onClick={close}
          >
            <span />
            <span />
          </button>
        </div>

        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ "--i": i } as CSSProperties}>
              <Link
                href={href(link.href)}
                onClick={close}
                aria-current={isCurrent(link.href) ? "page" : undefined}
              >
                {t.links[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter} style={{ "--i": NAV_LINKS.length } as CSSProperties}>
          {langSwitch()}
          <Link href={href(CTA_HREF)} className={styles.drawerCta} onClick={close}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
