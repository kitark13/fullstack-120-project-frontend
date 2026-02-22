import type { Metadata } from "next";
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
      <TanStackProvider>
        <body className={`${nunito.variable} ${sora.variable}`}>
          {children}
        </body>
      </TanStackProvider>
    </html>
  );
}
