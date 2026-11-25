import styles from "./Logo.module.scss";

type LogoProps = {
  className?: string;
};

/**
 * Isotipo de La Torre (el dibujo de la torre). Toma el color del texto
 * (currentColor), así cambia junto con la navbar según el fondo. El nombre
 * del hotel lo da el aria-label del link que lo envuelve.
 */
export default function Logo({ className }: LogoProps) {
  return <span className={[styles.mark, className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
