import type { CSSProperties } from "react";
import styles from "./Icon.module.scss";

export type IconName = "cama" | "campana" | "candado" | "chat" | "cubiertos" | "mail" | "pino";

type IconProps = {
  name: IconName;
  /** Tamaño en px */
  size?: number;
  className?: string;
};

/** Íconos de /public/icons, coloreables con `color` (usa currentColor). */
export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={[styles.icon, className].filter(Boolean).join(" ")}
      style={
        {
          "--icon-url": `url("/icons/icono-${name}.svg")`,
          "--icon-size": `${size}px`,
        } as CSSProperties
      }
    />
  );
}
