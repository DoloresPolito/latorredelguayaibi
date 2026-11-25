import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import Reveal from "@/components/Reveal/Reveal";
import PageTransition from "@/components/PageTransition/PageTransition";
import Footer from "@/components/Footer/Footer";
import { SITE, whatsappUrl } from "@/config/site";
import { FORM_ANCHOR } from "@/config/navigation";
import { ROOMS } from "@/config/rooms";
import { getDictionary, getLocale, type Dictionary } from "@/i18n/getDictionary";
import { emphasis } from "@/lib/emphasis";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.reservasTitle, description: t.meta.reservasDescription };
}

const BENEFITS: (keyof Dictionary["reservas"]["benefits"])[] = ["rooms", "breakfast", "meals", "nature"];

/**
 * Consultas de disponibilidad:
 * 1. Bloque verde: lo esencial de la estadía (4 puntos) y contacto directo.
 * 2. Foto fija a la izquierda con el título; a la derecha, el formulario que
 *    se scrollea (en mobile: foto arriba y formulario debajo).
 */
export default async function ReservasPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);
  const r = t.reservas;

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main>
        <section className={styles.essentials} data-nav-theme="dark" aria-labelledby="esencial-title">
          <p className={styles.kicker}>{r.eyebrow}</p>
          <h2 id="esencial-title" className={styles.essentialsTitle}>
            {emphasis(r.benefitsTitle)}
          </h2>

          <Reveal as="ul" className={styles.benefits} threshold={0.2}>
            {BENEFITS.map((key, i) => (
              <li key={key} className={styles.benefit}>
                <span className={styles.benefitNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.benefitTitle}>{r.benefits[key].title}</h3>
                <p className={styles.benefitText}>{r.benefits[key].text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.contact} threshold={0.3}>
            <div>
              <h2 className={styles.contactTitle}>{r.contactTitle}</h2>
              <p className={styles.contactText}>{r.contactText}</p>
            </div>
            <div className={styles.contactLinks}>
              <a href={whatsappUrl(r.whatsappGreeting)} target="_blank" rel="noopener noreferrer">
                {r.whatsappButton}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href={`mailto:${SITE.email}`}>
                {r.emailButton}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>

        {/* data-nav-split: en desktop la barra toma color según el lado (foto | formulario) */}
        <div className={styles.split} data-nav-split="0.42">
          <div className={styles.media}>
            <div className={styles.imageLayer}>
              <Image
                src="/images/atardecer.png"
                alt={r.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className={styles.image}
              />
            </div>
            <div className={styles.mediaText}>
              <h1 className={styles.title}>
                <span className={styles.line}>{r.titleLine1}</span>{" "}
                <span className={styles.line}>{emphasis(r.titleLine2)}</span>
              </h1>
            </div>
          </div>

          <section id={FORM_ANCHOR} className={styles.formCol} aria-label={r.formTitle}>
            <p className={styles.intro}>{emphasis(r.intro)}</p>

            {/* Suspense: el formulario usa la fecha actual, que se calcula en cada visita */}
            <Suspense fallback={<div className={styles.formFallback} aria-hidden="true" />}>
              <ReservationForm
                lang={lang}
                t={t.form}
                roomNames={Object.fromEntries(ROOMS.map(({ key }) => [key, t.habitaciones.rooms[key].name]))}
              />
            </Suspense>
          </section>
        </div>
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
