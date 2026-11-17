import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { NAV_LINKS } from "@/config/navigation";
import { SITE, whatsappUrl } from "@/config/site";
import CurrentYear from "./CurrentYear";
import FooterReveal from "./FooterReveal";
import styles from "./Footer.module.scss";

type FooterProps = {
  lang: Locale;
  t: Dictionary["footer"];
  nav: Dictionary["nav"];
};

function Label({ n, children }: { n: number; children: string }) {
  return (
    <p className={styles.label}>
      <span className={styles.chip} aria-hidden="true">
        {n}
      </span>
      <span className={styles.chip}>{children}</span>
    </p>
  );
}

/**
 * Footer terracota: emerge por debajo de la sección anterior al scrollear,
 * con el nombre del hotel gigante desplazándose de costado sin parar.
 */
export default function Footer({ lang, t, nav }: FooterProps) {
  return (
    <FooterReveal className={styles.footer} aria-label={t.ariaLabel}>
      <div className={styles.content}>
        <div className={styles.columns}>
          <nav className={styles.column} aria-label={t.menu}>
            <Label n={1}>{t.menu}</Label>
            <ul className={styles.list}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={localizePath(lang, link.href)} className={styles.link}>
                    {nav.links[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <Label n={2}>{t.socials}</Label>
            <ul className={styles.list}>
              <li>
                <a href={SITE.instagram} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {t.instagram}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {t.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles.end}`}>
            <Label n={3}>{t.contact}</Label>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${SITE.email}`} className={styles.link}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} className={styles.link} target="_blank" rel="noopener noreferrer">
                  +{SITE.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorativo: el nombre ya está en el resto de la página */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            <span className={styles.word}>{SITE.name}</span>
            <span className={styles.word}>{SITE.name}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © <CurrentYear /> {SITE.name}. {t.rights}
          </p>
          <a href="#top" className={styles.toTop}>
            {t.backToTop} ↑
          </a>
        </div>
      </div>

      <span className={styles.veil} aria-hidden="true" />
    </FooterReveal>
  );
}
