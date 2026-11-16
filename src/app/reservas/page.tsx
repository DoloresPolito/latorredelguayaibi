import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import Icon, { type IconName } from "@/components/Icon/Icon";
import { SITE, whatsappUrl } from "@/config/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `Reservas — ${SITE.name}`,
  description:
    "Consultá disponibilidad en La Torre del Guayaibí. Elegí tus fechas y te respondemos personalmente.",
};

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "cama",
    title: "Habitaciones amplias y confortables",
    text: "Con vistas al parque y la naturaleza.",
  },
  {
    icon: "cubiertos",
    title: "Desayuno incluido",
    text: "Preparado especialmente para cada huésped.",
  },
  {
    icon: "campana",
    title: "Almuerzos y cenas",
    text: "Con reserva previa y costo adicional.",
  },
  {
    icon: "pino",
    title: "Un entorno extraordinario",
    text: "En el corazón del campo correntino, cerca de los Esteros del Iberá.",
  },
];

export default function ReservasPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.media}>
          <Image
            src="/images/reservas.jpg"
            alt="Canoa navegando al atardecer en la laguna"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className={styles.image}
          />
        </div>

        <section className={styles.formCol} aria-labelledby="reservas-title">
          <p className={styles.eyebrow}>Consultas</p>
          <h1 id="reservas-title" className={styles.title}>
            Tu próxima <br />
            estadía te espera.
          </h1>
          <p className={styles.intro}>
            Completá el formulario y nos pondremos en contacto a la brevedad para ayudarte a
            organizar tu estadía en La Torre del Guayaibí.
          </p>

          <hr className={styles.divider} />

          {/* Suspense: el formulario usa la fecha actual, que se calcula en cada visita */}
          <Suspense fallback={<div className={styles.formFallback} aria-hidden="true" />}>
            <ReservationForm />
          </Suspense>
        </section>

        <aside className={styles.aside}>
          <p className={styles.eyebrow}>Una estadía con todo lo esencial</p>

          <ul className={styles.benefits}>
            {BENEFITS.map((b) => (
              <li key={b.icon} className={styles.benefit}>
                <Icon name={b.icon} size={44} className={styles.benefitIcon} />
                <h2 className={styles.benefitTitle}>{b.title}</h2>
                <p className={styles.benefitText}>{b.text}</p>
              </li>
            ))}
          </ul>

          <div className={styles.contact}>
            <p className={styles.contactText}>
              También podés escribirnos directamente por WhatsApp o por correo electrónico.
            </p>
            <div className={styles.contactButtons}>
              <a
                href={whatsappUrl("Hola! Quisiera hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactButton}
              >
                <Icon name="chat" size={20} />
                Escribir por WhatsApp
              </a>
              <a href={`mailto:${SITE.email}`} className={styles.contactButton}>
                <Icon name="mail" size={20} />
                Enviar un mail
              </a>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
