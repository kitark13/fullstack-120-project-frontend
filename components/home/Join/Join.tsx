"use client";

import Link from "next/link";

import css from "./Join.module.css";

import useAuthStore from "@/lib/store/authStore";

export default function Join() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const href = isAuthenticated ? "/auth/profile" : "/auth/register";
  const linkText = isAuthenticated ? "Збережені" : "Зареєструватися";

  return (
    <section className={css.joinSection} id="join">
      <div className="container">
        <div className={css.joinWrapper}>
          <h2 className={css.joinTitle}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.joinText}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <Link href={href} className={css.joinButton}>
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
