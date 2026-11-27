import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import EnvironmentDepth from "@/components/EnvironmentDepth/EnvironmentDepth";
import EnvironmentColumns from "@/components/EnvironmentColumns/EnvironmentColumns";
import QuietText from "@/components/QuietText/QuietText";
import EventsCta from "@/components/EventsCta/EventsCta";
import PageTransition from "@/components/PageTransition/PageTransition";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { DEPTH_COUNT, getEntornoPhotos } from "@/config/entorno";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.entornoTitle, description: t.meta.entornoDescription };
}

/**
 * Entorno, una galería en movimiento:
 * 1. Viaje entre fotos que flotan a distintas profundidades; al final una se
 *    abre a pantalla completa (EnvironmentDepth).
 * 2. Texto que se enciende al scrollear.
 * 3. Columnas de fotos que se deslizan a distintas velocidades (EnvironmentColumns).
 * 4. Cierre con botón a WhatsApp.
 */
export default async function EntornoPage() {
  const [lang, t] = await Promise.all([getLocale(), getDictionary()]);
  const e = t.entorno;

  return (
    <PageTransition>
      <Navbar lang={lang} t={t.nav} />
      <main id="top">
        <Suspense>
          <DepthPhotos e={e} />
        </Suspense>
        <QuietText t={e.quietText} compact />
        <Suspense>
          <ColumnsPhotos e={e} />
        </Suspense>
        <EventsCta id="consultar" t={e.cta} />
      </main>
      <Footer lang={lang} t={t.footer} nav={t.nav} />
    </PageTransition>
  );
}

/*
 * Las fotos salen de public/images/entorno/, en el orden de su número (ver
 * config/entorno). En producción quedan dentro de la página publicada; el
 * Suspense es para desarrollo, donde la carpeta se relee en cada visita.
 */
type GalleryProps = { e: Dictionary["entorno"] };

async function DepthPhotos({ e }: GalleryProps) {
  const photos = await getEntornoPhotos();
  return <EnvironmentDepth t={e.depth} images={e.images} fallbackAlt={e.imageFallback} photos={photos} />;
}

async function ColumnsPhotos({ e }: GalleryProps) {
  const photos = await getEntornoPhotos();
  return (
    <EnvironmentColumns
      t={e.columns}
      images={e.images}
      fallbackAlt={e.imageFallback}
      photos={photos.slice(DEPTH_COUNT + 1)}
    />
  );
}
