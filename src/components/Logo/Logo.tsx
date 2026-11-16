import styles from "./Logo.module.scss";

type LogoProps = {
  /** "dark" para fondos claros, "light" para fondos oscuros/fotos */
  tone?: "dark" | "light";
  className?: string;
};

export default function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <span className={[styles.logo, styles[tone], className].filter(Boolean).join(" ")}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.name}>
        La Torre
        <br />
        del Guayaibí
      </span>
    </span>
  );
}
