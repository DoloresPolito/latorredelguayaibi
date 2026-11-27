import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HistoryScroll from "@/components/HistoryScroll/HistoryScroll";
import PageTransition from "@/components/PageTransition/PageTransition";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.historiaTitle, description: t.meta.historiaDescription };
}

/**
 * Nuestra historia: un solo recorrido horizontal (HistoryScroll). Se
 * scrollea para abajo y los paneles avanzan hacia la izquierda; termina en
 * la foto de Habitaciones, que se abre hasta ocupar la pantalla.
 */
export default async function NuestraHistoriaPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <HistoryScroll lang={lang} t={t.historia} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
