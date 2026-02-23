import Link from "next/link";
import footerCss from "./NavListFooter.module.css";
import headerCss from "./NavListHeader.module.css";
import mobileCss from "./NavListMobile.module.css";

type NavListProps = {
  variant: "footer" | "header" | "mobileMenu";
};

const NavList = ({ variant }: NavListProps) => {
  const css =
    variant === "footer"
      ? footerCss
      : variant === "header"
        ? headerCss
        : mobileCss;
  const isAuthenticated = true; // временно ручной переключатель

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
              <Link className={css.linkNav} href="/story/create">
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
