import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
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
import EnvironmentInvite from "@/components/EnvironmentInvite/EnvironmentInvite";
import PageTransition from "@/components/PageTransition/PageTransition";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export default async function Home() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  const heroImage = "/images/nuevo-hero.png";
  const nextSectionId = "bienvenida";

  return (
    <PageTransition>
      <Opening image={heroImage} />
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        {/* "Telón" (como vesuvio.it): el panel de bienvenida sube por encima
            del hero y la foto a todo el ancho sube por encima del panel */}
        <Curtain>
          <Hero
            t={t.hero}
            image={{ src: heroImage, width: 1672, height: 941, alt: t.hero.imageAlt }}
            name={{ line1: t.opening.titleLine1, line2: t.opening.titleLine2 }}
            location={t.hero.location}
            nextSectionId={nextSectionId}
            // El botón baja con scroll suave a la sección siguiente (ver SmoothScroll)
            ctaHref={`#${nextSectionId}`}
          />
        </Curtain>
        {/* shade bajo: sobre el fondo claro, más oscuro se ve sucio */}
        <Curtain shade={0.12}>
          <WelcomePanel lang={lang} t={t.welcomePanel} />
        </Curtain>
        <FullBleedImage src="/images/laguna.jpg" alt={t.welcomePanel.imageAlt} />
        <QuietText t={t.quietText} />
        <RoomsShowcase lang={lang} t={t.roomsShowcase} />
        {/* Gastronomía, eventos y entorno comparten el fondo: al llegar a
            eventos pasa de crema a verde y sigue verde en la invitación al
            entorno. Después, la foto de la biblioteca sube por encima de la
            invitación (telón, como la laguna). Las reseñas quedan afuera, en
            crema: el corte de verde a crema es el borde de abajo de la foto */}
        <ToneShift targetId="eventos-home">
          <Dining t={t.dining} />
          <EventsShowcase lang={lang} t={t.eventsShowcase} />
          <Curtain>
            <EnvironmentInvite lang={lang} t={t.environmentInvite} />
          </Curtain>
          <FullBleedImage id="foto-casa" src="/images/libroshome.png" alt={t.environmentInvite.imageAlt} />
        </ToneShift>
        <Reviews t={t.reviews} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}
