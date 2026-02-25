"use client";

import Logo from "@/components/Logo/Logo";
import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authLayoutWrapper}>
      <header className={styles.authLayoutHeader}>
        <Logo variant="auth" />
      </header>
      <main className={styles.authLayoutMain}>{children}</main>
      <footer className={styles.authLayoutFooter}>
        <p className={styles.copyright}>© 2025 Подорожники</p>
      </footer>
    </div>
  );
}
