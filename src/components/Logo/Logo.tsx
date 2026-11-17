import styles from "./Logo.module.scss";

type LogoProps = {
  /** "dark" para fondos claros, "light" para fondos oscuros/fotos */
  tone?: "dark" | "light";
  className?: string;
  /** Clase extra para el nombre (p. ej. para ocultarlo en la navbar resumida) */
  nameClassName?: string;
  /** Clase extra para el isotipo */
  markClassName?: string;
};

export default function Logo({ tone = "dark", className, nameClassName, markClassName }: LogoProps) {
  return (
    <span className={[styles.logo, styles[tone], className].filter(Boolean).join(" ")}>
      <span className={[styles.mark, markClassName].filter(Boolean).join(" ")} aria-hidden="true" />
      <span className={[styles.name, nameClassName].filter(Boolean).join(" ")}>
        La Torre
        <br />
        del Guayaibí
      </span>
    </span>
  );
}
