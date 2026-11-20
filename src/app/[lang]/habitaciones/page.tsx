import type { Metadata } from "next";
import RoomsList from "@/components/RoomsList/RoomsList";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ThemeV2, { italianaTitleClass } from "@/components/ThemeV2/ThemeV2";
import RoomsRows from "@/components/RoomsRows/RoomsRows";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.habitacionesTitle, description: t.meta.habitacionesDescription };
}

// Prueba: habitaciones con el estilo nuevo del home (fondo crema, filas
// alternadas, botón por suite y cierre). En false vuelve la lista anterior.
const ROOMS_ROWS = false;

export default async function HabitacionesPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <ThemeV2>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        {ROOMS_ROWS ? (
          <RoomsRows lang={lang} t={t.habitaciones} titleClassName={italianaTitleClass} />
        ) : (
          <RoomsList
            lang={lang}
            intro={t.habitaciones.intro}
            t={t.habitaciones.list}
            rooms={t.habitaciones.rooms}
            titleClassName={italianaTitleClass}
          />
        )}
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </ThemeV2>
  );
}
