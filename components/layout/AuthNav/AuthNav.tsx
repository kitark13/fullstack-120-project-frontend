"use client";

import Link from "next/link";
import styles from "./AuthNav.module.css";
import ProfileLogout from "./ProfileLogout/ProfileLogout";
import useAuthStore from "@/lib/store/authStore";

type AuthNavProps = {
  variant: "header" | "mobMenu";
  theme?: "home" | "default";
  closeMobileMenu?: () => void;
};

export default function AuthNav({
  variant,
  theme = "home",
  closeMobileMenu,
}: AuthNavProps) {
  const { user, isAuthenticated } = useAuthStore();

  const isDefaultTheme = variant === "header" && theme === "default";

  return isAuthenticated ? (
    <ProfileLogout
      variant={variant}
      theme={theme}
      closeMobileMenu={closeMobileMenu}
    />
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
        } ${isDefaultTheme ? styles.linkLoginDefault : ""}`}
      >
        Вхід
      </Link>

      <Link
        onClick={closeMobileMenu}
        href="/auth/register"
        className={`${styles.linkAuthRender} ${styles.linkRegister} ${
          variant === "mobMenu" ? styles.mobAuthLinkReg : ""
        } ${isDefaultTheme ? styles.linkRegisterDefault : ""}`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
