import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/getDictionary";
import { interTight, italiana } from "@/styles/fonts";
import "@/styles/globals.scss";

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
      // Tipografías de la web como variables CSS (--font-sans, --font-italiana)
      className={`${interTight.variable} ${italiana.variable}`}
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
