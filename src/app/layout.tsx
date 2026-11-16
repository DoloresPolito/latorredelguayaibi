import type { Metadata } from "next";
import { EB_Garamond, Instrument_Serif } from "next/font/google";
import "@/styles/globals.scss";

// Alternativa gratuita a Canela Light. Si se consigue la licencia de Canela,
// reemplazar por next/font/local apuntando a los archivos .woff2.
const heading = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const editorial = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "La Torre del Guayaibí",
  description: "Hotel boutique rodeado de naturaleza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${heading.variable} ${editorial.variable}`}>
      <body>
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
