"use client";

import Link from "next/link";
import styles from "./AuthNav.module.css";
import ProfileLogout from "./ProfileLogout/ProfileLogout";
import useAuthStore from "@/lib/store/authStore";

type AuthNavProps = {
  variant: "header" | "mobMenu";
  closeMobileMenu?: () => void;
};

export default function AuthNav({ variant, closeMobileMenu }: AuthNavProps) {
  const { user, isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <ProfileLogout variant={variant} closeMobileMenu={closeMobileMenu} />
  ) : (
    <div
      className={`${styles.authContainer} ${
        variant === "mobMenu" ? styles.mobAuthContainer : ""
      }`}
    >
      <Link
        onClick={closeMobileMenu}
        href="/auth/login"
        className={`${styles.linkAuthRender} ${styles.linkLogin} ${
          variant === "mobMenu" ? styles.mobAuthEnter : ""
        }`}
      >
        Вхід
      </Link>

      <Link
        onClick={closeMobileMenu}
        href="/auth/register"
        className={`${styles.linkAuthRender} ${styles.linkRegister} ${
          variant === "mobMenu" ? styles.mobAuthLinkReg : ""
        }`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
