import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import Icon, { type IconName } from "@/components/Icon/Icon";
import { SITE, whatsappUrl } from "@/config/site";
import { getDictionary, getLocale, type Dictionary } from "@/i18n/getDictionary";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.reservasTitle, description: t.meta.reservasDescription };
}

const BENEFITS: { key: keyof Dictionary["reservas"]["benefits"]; icon: IconName }[] = [
  { key: "rooms", icon: "cama" },
  { key: "breakfast", icon: "cubiertos" },
  { key: "meals", icon: "campana" },
  { key: "nature", icon: "pino" },
];

export default async function ReservasPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <Navbar lang={lang} t={t.nav} />
      <main className={styles.page}>
        {/* Columna derecha (desktop): foto + beneficios, una pantalla de alto y fija.
            En mobile el wrapper "desaparece" (display: contents) para ordenar foto → form → beneficios */}
        <div className={styles.right}>
          <div className={styles.media}>
            <Image
              src="/images/reservas.jpg"
              alt={t.reservas.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className={styles.image}
            />
          </div>

          <aside className={styles.aside}>
            <BenefitsAndContact t={t.reservas} />
          </aside>
        </div>

        <section className={styles.formCol} aria-labelledby="reservas-title">
          <p className={styles.eyebrow}>{t.reservas.eyebrow}</p>
          <h1 id="reservas-title" className={styles.title}>
            {t.reservas.titleLine1} <br />
            {t.reservas.titleLine2}
          </h1>
          <p className={styles.intro}>{t.reservas.intro}</p>

          <hr className={styles.divider} />

          {/* Suspense: el formulario usa la fecha actual, que se calcula en cada visita */}
          <Suspense fallback={<div className={styles.formFallback} aria-hidden="true" />}>
            <ReservationForm lang={lang} t={t.form} />
          </Suspense>
        </section>
      </main>
    </>
  );
}

function BenefitsAndContact({ t }: { t: Dictionary["reservas"] }) {
  return (
    <>
      <p className={styles.eyebrow}>{t.benefitsTitle}</p>

      <ul className={styles.benefits}>
        {BENEFITS.map((b) => (
          <li key={b.key} className={styles.benefit}>
            <Icon name={b.icon} size={44} className={styles.benefitIcon} />
            <h2 className={styles.benefitTitle}>{t.benefits[b.key].title}</h2>
            <p className={styles.benefitText}>{t.benefits[b.key].text}</p>
          </li>
        ))}
      </ul>

      <div className={styles.contact}>
        <p className={styles.contactText}>{t.contactText}</p>
        <div className={styles.contactButtons}>
          <a
            href={whatsappUrl(t.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactButton}
          >
            <Icon name="chat" size={20} />
            {t.whatsappButton}
          </a>
          <a href={`mailto:${SITE.email}`} className={styles.contactButton}>
            <Icon name="mail" size={20} />
            {t.emailButton}
          </a>
        </div>
      </div>
    </>
  );
}
