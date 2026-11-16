import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          image={{
            src: "/images/imagen.png",
            alt: "Atardecer sobre la pileta de La Torre del Guayaibí, con eucaliptos y el campo correntino de fondo",
          }}
        />
        {/* Próxima sección: La experiencia */}
        <section id="experiencia" style={{ minHeight: "60vh" }} />
      </main>
    </>
  );
}
