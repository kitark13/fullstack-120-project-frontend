"use client";
import React, { useEffect } from "react";
import styles from "./MobileMenu.module.css";

import NavList from "../NavList/NavList";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../../Logo/Logo";
import ProfileLogout from "../AuthNav/ProfileLogout/ProfileLogout";

type Props = { isOpen: boolean; onClose: () => void };

export default function MobileMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.mobMenu} ${isOpen ? styles.open : ""}`}
      onClick={handleLinkClick}
    >
      {" "}
      <div className={`container ${styles.mobMenuDiv}`}>
        {" "}
        <div className={styles.mobileHead}>
          <Logo variant="mobMenu" />{" "}
          <button
            className={styles.btnClose}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            {" "}
            <svg className={styles.iconClose} width="22" height="22">
              {" "}
              <use href="/sprite-final-opt.svg#icon-close"></use>{" "}
            </svg>{" "}
          </button>{" "}
        </div>
        <NavList variant="mobMenu" />
        <AuthNav variant="mobMenu" />
      </div>{" "}
    </div>
  );
}
