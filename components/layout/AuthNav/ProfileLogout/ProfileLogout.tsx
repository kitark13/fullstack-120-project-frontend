"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./ProfileLogout.module.css";
import useAuthStore from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

type ProfileLogoutProps = {
  variant?: "header" | "mobile-menu";
};

export default function ProfileLogout({ variant }: ProfileLogoutProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  let userName = "Ім'я";
  if (user) {
    if (
      "data" in user &&
      typeof user.data === "object" &&
      user.data !== null &&
      "name" in user.data
    ) {
      userName = (user.data as { name: string }).name;
    } else if ("name" in user && typeof user.name === "string") {
      userName = user.name;
    }
  }
  const userAvatar =
    user && "avatarUrl" in user && typeof user.avatarUrl === "string"
      ? user.avatarUrl
      : user &&
          "data" in user &&
          typeof user.data === "object" &&
          user.data !== null &&
          "avatarUrl" in user.data &&
          typeof user.data.avatarUrl === "string"
        ? user.data.avatarUrl
        : undefined;

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <div className={css.logoutContainer}>
      <Link
        // onClick={closeMobileMenu}
        href="/profile"
        className={css.profileLink}
      >
        <Image
          src={userAvatar || "/default-avatar.png"}
          alt={userName}
          className={css.avatar}
          width={32}
          height={32}
        />
      </Link>
      <p className={css.userName}>{userName}</p>
      <button
        className={css.btnLogout}
        type="button"
        aria-label="Open menu logout"
        onClick={handleLogout}
      >
        <svg className={css.iconLogout} width="24" height="24">
          <use href="/sprite-final-opt.svg#icon-logout"></use>
        </svg>
      </button>
    </div>
  );
}
