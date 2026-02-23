<<<<<<< HEAD
import type { Metadata } from "next";
<<<<<<< HEAD
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const nunito = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700"],
=======
import { Unbounded, Nunito_Sans, Sora } from "next/font/google";
=======
import "modern-normalize/modern-normalize.css";
>>>>>>> 2697874838b6720a5ea049f8f6578736c7d8e526
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/layout/Header/Header";
import { Footer } from "../components/layout/Footer/Footer";

// Unbounded
// const unbounded = Unbounded({
//   subsets: ["latin", "cyrillic"],
//   weight: ["400", "600", "800"],
//   variable: "--font-heading",
//   display: "swap",
// });
<<<<<<< HEAD
// ${nunitoSans.variable}
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
>>>>>>> 55d8bfc4f23936c77129d2dc88898b473510ccd0
  variable: "--font-sora",
=======
// ${unbounded.variable}

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
>>>>>>> 2697874838b6720a5ea049f8f6578736c7d8e526
  display: "swap",
});

// Sora
// const sora = Sora({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-sora",
//   display: "swap",
// });
// ${sora.variable}

export const metadata: Metadata = {
  title: "Подорожники",
  description:
    "Подорожники — додаток для збереження та перегляду ваших подорожей",
  icons: { icon: "/favicon-opt.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
<<<<<<< HEAD
<<<<<<< HEAD
      <TanStackProvider>
        <body className={`${nunito.variable} ${sora.variable}`}>
          {children}
        </body>
      </TanStackProvider>
=======
      <body className={`${unbounded.variable} ${sora.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
=======
      <body className={`${nunitoSans.variable}`}>
        <TanStackProvider>
          <div className="page">
            <Header />
            {children}
            <Footer />
          </div>
        </TanStackProvider>
>>>>>>> 2697874838b6720a5ea049f8f6578736c7d8e526
      </body>
>>>>>>> 55d8bfc4f23936c77129d2dc88898b473510ccd0
    </html>
  );
}
