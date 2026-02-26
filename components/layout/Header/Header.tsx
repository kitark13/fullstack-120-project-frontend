"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import NavList from "../NavList/NavList";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";

interface HeaderProps {
  theme?: "home" | "default";
}

const Header: React.FC<HeaderProps> = ({ theme: propsTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const theme = propsTheme || (pathname === "/" ? "home" : "default");
  const isHome = theme === "home";

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={isHome ? styles.header : styles.headerDefault} id="home">
      <div
        className={`container ${isHome ? styles.headerContainer : styles.headerContainerDefault}`}
      >
        <Logo variant="header" theme={theme} />
        <NavList variant="header" theme={theme} />
        <AuthNav variant="header" theme={theme} />

        <button
          className={`${styles.menuBtn} ${styles.openMenu} ${!isHome ? styles.menuBtnDefault : ""}`}
          type="button"
          aria-label="Open menu"
          onClick={toggleMenu}
        >
          <svg className={styles.iconBurger} width="24" height="24">
            <use href="/sprite-final-opt.svg#icon-menu"></use>
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </header>
  );
};

export default Header;
