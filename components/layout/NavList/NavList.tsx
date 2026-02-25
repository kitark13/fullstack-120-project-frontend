"use client";
import Link from "next/link";
import footerCss from "./NavListFooter.module.css";
import headerCss from "./NavListHeader.module.css";
import mobileCss from "./NavListMobile.module.css";
import useAuthStore from "@/lib/store/authStore";

type NavListProps = {
  variant: "footer" | "header" | "mobMenu";
};

const NavList = ({ variant }: NavListProps) => {
  const { isAuthenticated } = useAuthStore();
  const css =
    variant === "footer"
      ? footerCss
      : variant === "header"
        ? headerCss
        : mobileCss;

  return (
    <nav className={css.navigation}>
      <ul className={css.listNav}>
        <li className={css.itemNav}>
          <Link className={css.linkNav} href="#home">
            Головна
          </Link>
        </li>

        <li className={css.itemNav}>
          <Link className={css.linkNav} href="/histories">
            Історії
          </Link>
        </li>

        <li className={css.itemNav}>
          <Link className={css.linkNav} href="/travellers">
            Мандрівники
          </Link>
        </li>

        {isAuthenticated && (
          <>
            <li className={css.itemNav}>
              <Link className={css.linkNav} href="/profile">
                Мій профіль
              </Link>
            </li>

            <li className={css.itemNav}>
              <Link
                className={`${css.linkNav} ${css.tabLink}`}
                href="/story/create"
              >
                Опублікувати історію
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavList;
