"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import css from "./ProfileLogout.module.css";
import useAuthStore from "@/lib/store/authStore";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { useRouter } from "next/navigation";

type ProfileLogoutProps = {
  variant?: "header" | "mobMenu";
  theme?: "home" | "default";
  closeMobileMenu?: () => void;
};

export default function ProfileLogout({
  variant,
  theme = "home",
  closeMobileMenu,
}: ProfileLogoutProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const isDefaultTheme = variant === "header" && theme === "default";

  const userName = user?.name || "Користувач";
  const userAvatar = user?.avatarUrl ?? "/default-avatar.png";

  const handleLogout = async () => {
    await logout();
    setIsModalOpen(false);
    closeMobileMenu?.();
    clearIsAuthenticated();
    router.push("/auth/login");
  };

  return (
    <div
      className={`${css.logoutContainer} ${
        variant === "mobMenu" ? css.mobileMenuLog : ""
      }`}
    >
      <Link
        onClick={closeMobileMenu}
        href="/profile"
        className={css.profileLink}
      >
        <Image
          src={userAvatar}
          alt={userName}
          className={css.avatar}
          width={32}
          height={32}
        />
        <p
          className={`${css.userName} ${isDefaultTheme ? css.userNameDefault : ""}`}
        >
          {userName}
        </p>
      </Link>
      <div
        className={`${css.divider} ${variant === "header" ? css.dividerMainPage : ""} ${isDefaultTheme ? css.dividerDefault : ""}`}
      ></div>
      <button
        className={`${css.btnLogout} ${isDefaultTheme ? css.btnLogoutDefault : ""}`}
        type="button"
        aria-label="Logout"
        onClick={() => {
          closeMobileMenu?.();
          setIsModalOpen(true);
        }}
      >
        <svg className={css.iconLogout} width="24" height="24">
          <use href="/sprite-final-opt.svg#icon-logout"></use>
        </svg>
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Ви точно хочете вийти?"
        message="Ми будемо сумувати за вами!"
        confirmText="Вийти"
        cancelText="Відмінити"
      />
    </div>
  );
}
