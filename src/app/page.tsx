import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          image={{
            src: "/images/hero.png",
            width: 1562,
            height: 1007,
            alt: "La Torre del Guayaibí al atardecer, con la casa de piedra reflejada en la pileta",
          }}
        />
        {/* Próxima sección: La experiencia */}
        <section id="experiencia" style={{ minHeight: "120vh" }} />
      </main>
    </>
  );
}
