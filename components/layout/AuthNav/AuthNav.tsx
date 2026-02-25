"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthNav.module.css";
import { useState } from "react";
import ProfileLogout from "./ProfileLogout/ProfileLogout";
import useAuthStore from "@/lib/store/authStore";

type AuthNavProps = {
  variant: "header" | "mobMenu";
  closeMobileMenu?: () => void;
};

export default function AuthNav({ variant }: AuthNavProps) {
  const { user, isAuthenticated } = useAuthStore();
  console.log(user);
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <ProfileLogout variant={variant} />
  ) : (
    <div
      className={`${styles.authContainer} ${
        variant === "mobMenu" ? styles.mobAuthContainer : ""
      }`}
    >
      <Link
        href="/auth/login"
        className={`${styles.linkAuthRender} ${styles.linkLogin} ${
          variant === "mobMenu" ? styles.mobAuthEnter : ""
        }`}
      >
        Вхід
      </Link>

      <Link
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
