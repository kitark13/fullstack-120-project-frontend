"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import NavList from "../NavList/NavList";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={isHome ? styles.header : styles.headerDefault} id="home">
      <div className={`${styles.headerContainer} container`}>
        <Logo />
        <NavList variant="header" />
        <AuthNav />

        <button
          className={`${styles.menuBtn} ${styles.openMenu}`}
          type="button"
          aria-label="Open menu"
          onClick={toggleMenu}
        >
          <svg className={styles.iconBurger} width="24" height="24">
            <use href="/menu.svg"></use>
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </header>
  );
};

export default Header;
