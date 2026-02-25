import "modern-normalize/modern-normalize.css";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

// Unbounded
// const unbounded = Unbounded({
//   subsets: ["latin", "cyrillic"],
//   weight: ["400", "600", "800"],
//   variable: "--font-heading",
//   display: "swap",
// });
// ${unbounded.variable}

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
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
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={`${nunitoSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
