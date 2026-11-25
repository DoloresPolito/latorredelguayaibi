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
import { useScrollFrame } from "@/lib/useScrollFrame";

type NavLink = (typeof NAV_LINKS)[number];
import { SITE, phoneUrl, socialLinks, whatsappUrl } from "@/config/site";
import styles from "./Navbar.module.scss";


type NavbarProps = {
  lang: Locale;
  t: Dictionary["nav"];
};

/**
 * Rect de una sección, recortado por su <Curtain> si tiene uno: el telón
 * corre la sección hacia abajo (transform) mientras sale, pero solo se ve
 * la parte que queda dentro del envoltorio.
 */
function visibleRect(section: Element) {
  const r = section.getBoundingClientRect();
  const clip = section.closest("[data-curtain]");
  if (!clip) return r;
  const c = clip.getBoundingClientRect();
  return { top: Math.max(r.top, c.top), bottom: Math.min(r.bottom, c.bottom) };
}

export default function Navbar({ lang, t }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [isOnDark, setIsOnDark] = useState(false);
  const [isOnSplit, setIsOnSplit] = useState(false);
  const [isOnGlass, setIsOnGlass] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // En cada scroll: cuánto se achica el logo y sobre qué fondo está la barra
  // (oscuro, foto, sección partida)
  useScrollFrame(ref, (el) => {
    // Achique del logo: 0 arriba de todo → 1 a los 240px de
    // scroll, con una curva suave. Lo usa el CSS como --shrink.
    const t = Math.min(1, window.scrollY / 240);
    el.style.setProperty("--shrink", (t * t * (3 - 2 * t)).toFixed(4));

    // ¿La barra está sobre una sección oscura? (marcadas con data-nav-theme="dark")
    const rect = el.getBoundingClientRect();
    const y = rect.top + rect.height / 2;
    setIsOnDark(
      Array.from(document.querySelectorAll('[data-nav-theme="dark"]')).some((section) => {
        const r = visibleRect(section);
        return r.top <= y && r.bottom >= y;
      }),
    );
    // ¿Sobre una foto oscurecida (data-nav-glass)? Pastilla de vidrio claro
    // en vez de la verde oscura
    setIsOnGlass(
      Array.from(document.querySelectorAll("[data-nav-glass]")).some((section) => {
        const r = visibleRect(section);
        return r.top <= y && r.bottom >= y;
      }),
    );

    // ¿Está sobre una sección partida en oscuro | claro? (data-nav-split =
    // dónde cae el corte, de 0 a 1 del ancho; solo desde lg, en mobile el
    // corte es horizontal). La pastilla pasa a vidrio transparente y cada
    // link / el isotipo toma el color según el lado del corte en que queda.
    const split = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-split]")).find(
      (section) => {
        const r = visibleRect(section);
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
  });

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
  // Sección actual (también sus subpáginas), para marcarla en la barra.
  // El home ("/") solo cuenta como actual en sí mismo, no en sus subpáginas.
  // Los links con markCurrent: false (Contacto) nunca se marcan.
  const isCurrent = (link: NavLink) =>
    !("markCurrent" in link && !link.markCurrent) &&
    (pathname === href(link.href) || (link.href !== "/" && pathname.startsWith(`${href(link.href)}/`)));

  return (
    <header
      ref={ref}
      className={[styles.header, isOnDark && styles.onDark, isOnSplit && styles.onSplit, isOnGlass && styles.onGlass]
        .filter(Boolean)
        .join(" ")}
      // Queda quieta durante la transición entre páginas (_page-transitions.scss)
      style={{ viewTransitionName: "site-header" }}
    >
      <nav className={styles.bar} aria-label={t.ariaLabel}>
        <Link href={href("/")} className={styles.brand} aria-label={t.home} onClick={close} data-split-target>
          <Logo className={styles.logoMark} />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={href(link.href)}
                className={styles.link}
                aria-current={isCurrent(link) ? "page" : undefined}
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
          <span className={styles.chip}>{t.menu}</span>
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
                aria-current={isCurrent(link) ? "page" : undefined}
              >
                {t.links[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter} style={{ "--i": NAV_LINKS.length } as CSSProperties}>
          {/* Redes y contacto, como en el footer */}
          <div className={styles.drawerInfo}>
            <div>
              <p className={styles.chip}>{t.socials}</p>
              <ul className={styles.infoList}>
                {socialLinks.map(({ key, url }) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {t[key]}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    {t.whatsapp}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.chip}>{t.contact}</p>
              <ul className={styles.infoList}>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <a href={phoneUrl}>{SITE.phone}</a>
                </li>
              </ul>
            </div>
          </div>

          {langSwitch(styles.langDrawer)}
          <Link href={href(CTA_HREF)} className={styles.drawerCta} onClick={close}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
