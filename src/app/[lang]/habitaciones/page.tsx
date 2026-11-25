import type { Metadata } from "next";
import RoomsList from "@/components/RoomsList/RoomsList";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageTransition from "@/components/PageTransition/PageTransition";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.habitacionesTitle, description: t.meta.habitacionesDescription };
}

export default async function HabitacionesPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <RoomsList lang={lang} intro={t.habitaciones.intro} t={t.habitaciones.list} rooms={t.habitaciones.rooms} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
