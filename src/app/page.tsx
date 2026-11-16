import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main>
      <Hero
        image={{
          src: "/images/hero.png",
          alt: "La Torre del Guayaibí al atardecer, con la casa de piedra reflejada en la pileta",
        }}
      />
      {/* La navbar va después del hero: arranca abajo y al scrollear queda fija arriba */}
      <Navbar variant="home" />
      {/* Próxima sección: La experiencia */}
      <section id="experiencia" style={{ minHeight: "120vh" }} />
    </main>
  );
}
