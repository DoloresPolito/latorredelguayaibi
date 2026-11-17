import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import ScrollText from "@/components/ScrollText/ScrollText";
import Parallax from "@/components/Parallax/Parallax";
import PointerDrift from "@/components/PointerDrift/PointerDrift";
import styles from "./Manifesto.module.scss";

type ManifestoProps = {
  t: Dictionary["manifesto"];
  id?: string;
};

/**
 * Sección oscura: frase grande que se enciende letra por letra al scrollear,
 * y al costado una foto que se abre como una ventana a medida que entra
 * en pantalla (también ligada al scroll) y sigue apenas al mouse.
 */
export default function Manifesto({ t, id = "manifiesto" }: ManifestoProps) {
  return (
    <section id={id} className={styles.section} data-nav-theme="dark">
      <div className={styles.inner}>
        <ScrollText text={t.text} className={styles.text} />

        <PointerDrift className={styles.media}>
          <Parallax className={styles.frame}>
            <div className={styles.layer}>
              <Image
                src="/images/imagen.png"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className={styles.image}
              />
            </div>
          </Parallax>
        </PointerDrift>
      </div>
    </section>
  );
}
