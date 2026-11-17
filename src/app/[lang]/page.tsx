import Hero from "@/components/Hero/Hero";
import Intro from "@/components/Intro/Intro";
import RoomsTeaser from "@/components/RoomsTeaser/RoomsTeaser";
import Navbar from "@/components/Navbar/Navbar";
import { getDictionary, getLocale } from "@/i18n/getDictionary";

export default async function Home() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <Navbar lang={lang} t={t.nav} />
      <main>
        <Hero
          lang={lang}
          t={t.hero}
          image={{
            src: "/images/nuevo-hero.png",
            width: 1672,
            height: 941,
            alt: t.hero.imageAlt,
          }}
        />
        <Intro lang={lang} t={t.intro} />
        <RoomsTeaser lang={lang} t={t.roomsTeaser} />
      </main>
    </>
  );
}
