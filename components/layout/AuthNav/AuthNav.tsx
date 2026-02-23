"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthNav.module.css";
import { useState } from "react";

export default function AuthNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleMenu = () => setIsAuthenticated(!isAuthenticated);

  return isAuthenticated ? (
    <div className={styles.authContainer}>
      <Link
        href="/auth/login"
        className={`${styles.linkAuthRender} ${styles.linkLogin}`}
      >
        Вхід
      </Link>
      <Link
        href="/auth/register"
        className={`${styles.linkAuthRender} ${styles.linkRegister}`}
      >
        Реєстрація
      </Link>
    </div>
  ) : (
    <>
      <button onClick={toggleMenu} className={styles.logoutBtn}>
        Вихід
      </button>
    </>
  );
}
