import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import Manifesto from "@/components/Manifesto/Manifesto";
import RoomsTeaser from "@/components/RoomsTeaser/RoomsTeaser";
import EventsTeaser from "@/components/EventsTeaser/EventsTeaser";
import Navbar from "@/components/Navbar/Navbar";
import Opening from "@/components/Opening/Opening";
import Curtain from "@/components/Curtain/Curtain";
import WelcomePanel from "@/components/WelcomePanel/WelcomePanel";
import FullBleedImage from "@/components/FullBleedImage/FullBleedImage";
import QuietText from "@/components/QuietText/QuietText";
import RoomsShowcase from "@/components/RoomsShowcase/RoomsShowcase";
import Dining from "@/components/Dining/Dining";
import EventsShowcase from "@/components/EventsShowcase/EventsShowcase";
import ToneShift from "@/components/ToneShift/ToneShift";
import Reviews from "@/components/Reviews/Reviews";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import ThemeV2, { italianaTitleClass } from "@/components/ThemeV2/ThemeV2";

// Home nuevo (diseño "theme-v2"). La versión anterior quedó en /[lang]/original.

// Prueba "telón" (como vesuvio.it): el panel de color sube por encima del
// hero y la foto a todo el ancho sube por encima del panel. En lugar del
// Manifesto. Poner en false para volver al home de antes.
const CURTAIN = true;

// Prueba: resumen de habitaciones con dos fotos superpuestas.
// Poner en false para volver a la sección anterior (RoomsTeaser).
const ROOMS_SHOWCASE = true;

// Prueba: eventos con el estilo nuevo (fondo verde, lista de propuestas y
// dos fotos superpuestas). Poner en false para volver a la sección anterior.
const EVENTS_SHOWCASE = true;

export default async function Home() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  const heroImage = "/images/nuevo-hero.png";

  const hero = (
    <Hero
      lang={lang}
      t={t.hero}
      image={{
        src: heroImage,
        width: 1672,
        height: 941,
        alt: t.hero.imageAlt,
      }}
      nextSectionId={CURTAIN ? "bienvenida" : "manifiesto"}
      variant="name"
      name={{ line1: t.opening.titleLine1, line2: t.opening.titleLine2 }}
      titleClassName={italianaTitleClass}
      layout="centered" // prueba: sacar esta línea para volver al hero anterior
    />
  );

  return (
    <ThemeV2>
      <Opening image={heroImage} />
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        {CURTAIN ? (
          <>
            <Curtain>{hero}</Curtain>
            {/* shade bajo: sobre el fondo claro, más oscuro se ve sucio */}
            <Curtain shade={0.12}>
              <WelcomePanel lang={lang} t={t.welcomePanel} titleClassName={italianaTitleClass} />
            </Curtain>
            <FullBleedImage src="/images/laguna.jpg" alt={t.welcomePanel.imageAlt} />
            <QuietText t={t.quietText} textClassName={italianaTitleClass} />
          </>
        ) : (
          <>
            {hero}
            <Manifesto t={t.manifesto} />
          </>
        )}
        {ROOMS_SHOWCASE ? (
          <RoomsShowcase
            lang={lang}
            t={t.roomsShowcase}
            titleClassName={italianaTitleClass}
          />
        ) : (
          <RoomsTeaser lang={lang} t={t.roomsTeaser} variant="quote" />
        )}
        {EVENTS_SHOWCASE ? (
          // Gastronomía, eventos y reseñas comparten el fondo: al llegar a
          // eventos pasa de crema a verde y al llegar a las reseñas vuelve a
          // crema, con una transición, sin línea de corte
          <ToneShift targetId="eventos-home" untilId="resenas">
            <Dining t={t.dining} titleClassName={italianaTitleClass} />
            <EventsShowcase
              lang={lang}
              t={t.eventsShowcase}
              images={t.eventsTeaser}
              titleClassName={italianaTitleClass}
            />
            <Reviews t={t.reviews} quoteClassName={italianaTitleClass} />
          </ToneShift>
        ) : (
          <>
            <Dining t={t.dining} titleClassName={italianaTitleClass} />
            <EventsTeaser lang={lang} t={t.eventsTeaser} />
          </>
        )}
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </ThemeV2>
  );
}
