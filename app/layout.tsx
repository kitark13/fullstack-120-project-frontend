import type { Metadata } from "next";
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
      <body className={`${unbounded.variable} ${sora.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
