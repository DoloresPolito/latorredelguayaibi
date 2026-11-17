import type { ReactNode } from "react";
import { layGrotesk, sansTest } from "./fonts";
import styles from "./ThemeV2.module.scss";

/** Clase para poner un título en Lay Grotesk dentro de <ThemeV2> */
export const layTitleClass = styles.layTitle;

/**
 * Envoltorio del diseño nuevo (home y reservas): carga sus tipografías y
 * agrega la clase global "theme-v2", que los componentes usan para sus
 * estilos nuevos (botones, navbar, títulos). La versión anterior del home
 * quedó en /[lang]/original, sin este envoltorio.
 */
export default function ThemeV2({ children }: { children: ReactNode }) {
  return (
    <div className={`theme-v2 ${sansTest.variable} ${layGrotesk.variable} ${styles.theme}`}>{children}</div>
  );
}
