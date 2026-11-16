import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Próxima sección: La experiencia */}
        <section id="experiencia" style={{ minHeight: "60vh" }} />
      </main>
    </>
  );
}
