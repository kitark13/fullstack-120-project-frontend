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
import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

import {} from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
  variable: "--font-heading",
  display: "swap",
});

// const nunitoSans = Nunito_Sans({
//   subsets: ["cyrillic"],
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-nunito-sans",
//   display: "swap",
// });
// ${nunitoSans.variable}
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
>>>>>>> 55d8bfc4f23936c77129d2dc88898b473510ccd0
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Подорожники",
  description:
    "Подорожники — додаток для збереження та перегляду ваших подорожей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
<<<<<<< HEAD
      <TanStackProvider>
        <body className={`${nunito.variable} ${sora.variable}`}>
          {children}
        </body>
      </TanStackProvider>
=======
      <body className={`${unbounded.variable} ${sora.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
>>>>>>> 55d8bfc4f23936c77129d2dc88898b473510ccd0
    </html>
  );
}
