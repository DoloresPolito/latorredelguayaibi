import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageTransition from "@/components/PageTransition/PageTransition";
import { localizePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import styles from "./not-found.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.notFoundTitle };
}

/**
 * Página de error 404: se muestra cuando una dirección no existe (ver
 * [...rest]/page.tsx) o cuando una página llama a notFound(). Fondo crema
 * de una pantalla de alto, con el mensaje centrado y dos salidas: el inicio
 * y las habitaciones.
 */
export default async function NotFound() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);
  const n = t.notFound;

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <section className={styles.section} aria-labelledby="error-title">
          <div className={styles.content}>
            <p className={styles.eyebrow}>{n.eyebrow}</p>
            <h1 id="error-title" className={styles.title}>
              {n.title}
            </h1>
            <p className={styles.text}>{n.text}</p>
            <div className={styles.actions}>
              <Link href={localizePath(lang, "/")} className={styles.primary}>
                {n.home}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href={localizePath(lang, "/habitaciones")} className={styles.secondary}>
                {n.rooms}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
