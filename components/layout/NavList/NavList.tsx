"use client";
import Link from "next/link";
import footerCss from "./NavListFooter.module.css";
import headerCss from "./NavListHeader.module.css";
import mobileCss from "./NavListMobile.module.css";
import useAuthStore from "@/lib/store/authStore";
import { usePathname } from "next/navigation";

type NavListProps = {
  variant: "footer" | "header" | "mobMenu";
  theme?: "home" | "default";
};

const NavList = ({ variant, theme = "home" }: NavListProps) => {
  const isDefaultTheme = variant === "header" && theme === "default";

  const { isAuthenticated } = useAuthStore();

  const css =
    variant === "footer"
      ? footerCss
      : variant === "header"
        ? headerCss
        : mobileCss;

  return (
    <nav
      className={`${css.navigation} ${
        isDefaultTheme ? headerCss.notHomeNavigation : ""
      }`}
    >
      <ul className={css.listNav}>
        <li className={css.itemNav}>
          <Link
            className={`${css.linkNav} ${
              isDefaultTheme ? headerCss.notHomeLink : ""
            }`}
            href="/"
          >
            Головна
          </Link>
        </li>

        <li className={css.itemNav}>
          <Link
            className={`${css.linkNav} ${
              isDefaultTheme ? headerCss.notHomeLink : ""
            }`}
            href="/stories"
          >
            Історії
          </Link>
        </li>

        <li className={css.itemNav}>
          <Link
            className={`${css.linkNav} ${
              isDefaultTheme ? headerCss.notHomeLink : ""
            }`}
            href="/travellers"
          >
            Мандрівники
          </Link>
        </li>

        {isAuthenticated && (
          <>
            <li className={css.itemNav}>
              <Link
                className={`${css.linkNav} ${
                  isDefaultTheme ? headerCss.notHomeLink : ""
                }`}
                href="/profile"
              >
                Мій профіль
              </Link>
            </li>

            <li className={css.itemNav}>
              <Link
                className={`${css.linkNav} ${css.tabLink} ${
                  isDefaultTheme ? headerCss.notHomeLink : ""
                }`}
                href="/stories/create"
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
