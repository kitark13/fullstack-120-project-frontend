"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./PageToggle.module.css";

export default function PageToggle() {
  const pathname = usePathname();

  const isSaved =
    pathname === "/profile/saved" || pathname.startsWith("/profile/saved/");
  const isOwn =
    pathname === "/profile/own" || pathname.startsWith("/profile/own/");

  return (
    <div className={css.toggleNav}>
      <Link
        href="/profile/saved"
        className={`${css.toggleLink} ${isSaved ? css.active : ""}`}
      >
        Збережені історії
      </Link>
      <Link
        href="/profile/own"
        className={`${css.toggleLink} ${isOwn ? css.active : ""}`}
      >
        Мої історії
      </Link>
    </div>
  );
}
