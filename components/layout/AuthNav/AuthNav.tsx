"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthNav.module.css";
import { useState } from "react";
import ProfileLogout from "./ProfileLogout/ProfileLogout";
type AuthNavProps = {
  variant: "header" | "mobMenu";
};

export default function AuthNav({ variant }: AuthNavProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const toggleMenu = () => setIsAuthenticated(!isAuthenticated);

  return isAuthenticated ? (
    <div
      className={`${styles.authContainer} ${
        variant === "mobMenu" ? styles.mobAuthContainer : ""
      }`}
    >
      <Link
        href="/auth/login"
        className={`${styles.linkAuthRender} ${styles.linkLogin}
        ${variant === "mobMenu" ? styles.mobAuthEnter : ""}`}
      >
        Вхід
      </Link>
      <Link
        href="/auth/register"
        className={`${styles.linkAuthRender} ${styles.linkRegister}
         ${variant === "mobMenu" ? styles.mobAuthLinkReg : ""}`}
      >
        Реєстрація
      </Link>
    </div>
  ) : (
    <>
      <ProfileLogout />
      {/* <button
        className={styles.btnLogout}
        type="button"
        aria-label="Open menu"
        onClick={toggleMenu}
      >
        <svg className={styles.iconLogout} width="24" height="24">
          <use href="/sprite-final-opt.svg#icon-logout"></use>
        </svg>
      </button> */}
    </>
  );
}
