import type { Metadata } from "next";
import { EB_Garamond, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import "@/styles/globals.scss";

// Tipografía de títulos. (Antes: Instrument Serif, alternativa gratuita a
// Canela Light.) Si se consigue la licencia de Canela, reemplazar por
// next/font/local apuntando a los archivos .woff2.
const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const editorial = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

// Genera /es y /en de forma estática
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();

  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLocale();
  return (
    <html
      lang={lang}
      className={`${heading.variable} ${editorial.variable}`}
      // Que Next saque el scroll suave al cambiar de página (si no, el salto
      // arriba de todo se anima y termina en cualquier lado)
      data-scroll-behavior="smooth"
      // <Opening> marca data-intro antes de hidratar
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll />
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
