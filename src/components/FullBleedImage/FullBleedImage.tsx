import Image from "next/image";
import styles from "./FullBleedImage.module.scss";

type FullBleedImageProps = {
  src: string;
  alt: string;
};

/**
 * Foto a todo el ancho, de tamaño fijo, que scrollea normal. El efecto lo
 * hace la sección de arriba (envuelta en <Curtain>): se queda atrás y la
 * foto le pasa por encima, como en vesuvio.it.
 */
export default function FullBleedImage({ src, alt }: FullBleedImageProps) {
  return (
    <section className={styles.section} data-nav-theme="dark">
      <div className={styles.frame}>
        <Image src={src} alt={alt} fill sizes="100vw" className={styles.image} />
      </div>
    </section>
  );
}
