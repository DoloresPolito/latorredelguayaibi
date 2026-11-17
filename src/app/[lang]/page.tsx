import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import Intro from "@/components/Intro/Intro";
import Manifesto from "@/components/Manifesto/Manifesto";
import RoomsTeaser from "@/components/RoomsTeaser/RoomsTeaser";
import Navbar from "@/components/Navbar/Navbar";
import Opening from "@/components/Opening/Opening";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import ThemeV2, { layTitleClass } from "@/components/ThemeV2/ThemeV2";

// Home nuevo (diseño "theme-v2"). La versión anterior quedó en /[lang]/original.

export default async function Home() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  const heroImage = "/images/nuevo-hero.png";

  return (
    <ThemeV2>
      <Opening t={t.opening} image={heroImage} />
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <Hero
          lang={lang}
          t={t.hero}
          image={{
            src: heroImage,
            width: 1672,
            height: 941,
            alt: t.hero.imageAlt,
          }}
          nextSectionId="manifiesto"
          variant="name"
          name={{ line1: t.opening.titleLine1, line2: t.opening.titleLine2 }}
          titleClassName={layTitleClass}
        />
        <Manifesto t={t.manifesto} />
        <Intro lang={lang} t={t.intro} />
        <RoomsTeaser lang={lang} t={t.roomsTeaser} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </ThemeV2>
  );
}
