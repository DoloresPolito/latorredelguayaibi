import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import QuietText from "@/components/QuietText/QuietText";
import EventServices from "@/components/EventServices/EventServices";
import EventsCta from "@/components/EventsCta/EventsCta";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageTransition from "@/components/PageTransition/PageTransition";
import { whatsappUrl } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.eventosTitle, description: t.meta.eventosDescription };
}

/**
 * Eventos: hero como el del home (foto con título y bajada), una franja de
 * texto que se enciende al scrollear, las propuestas en zigzag y, al final,
 * una frase con el botón para reservar un evento por WhatsApp.
 */
export default async function EventosPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);
  const hero = t.eventos.hero;

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <Hero
          t={hero}
          image={{ src: "/images/eventos/noche.png", width: 1536, height: 1024, alt: hero.imageAlt }}
          name={{ line1: hero.titleLine1, line2: hero.titleLine2 }}
          nextSectionId="eventos-texto"
          ctaHref={whatsappUrl(hero.whatsapp)}
        />
        <QuietText id="eventos-texto" t={t.eventos.quietText} compact />
        <EventServices t={t.eventos.services} />
        <EventsCta t={t.eventos.cta} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
