import type { Metadata } from "next";
import EventIntro from "@/components/EventIntro/EventIntro";
import EventServices from "@/components/EventServices/EventServices";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ThemeV2 from "@/components/ThemeV2/ThemeV2";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.eventosTitle, description: t.meta.eventosDescription };
}

export default async function EventosPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <ThemeV2>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <EventIntro t={t.eventos.intro} id="eventos-intro" />
        <EventServices t={t.eventos.services} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </ThemeV2>
  );
}
