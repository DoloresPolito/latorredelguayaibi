import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          image={{
            src: "/images/nuevo-hero.png",
            width: 1672,
            height: 941,
            alt: "La Torre del Guayaibí al atardecer, con la casa de piedra y los eucaliptos reflejados en la pileta",
          }}
        />
        {/* Próxima sección: La experiencia */}
        <section id="experiencia" style={{ minHeight: "120vh" }} />
      </main>
    </>
  );
}
