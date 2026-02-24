"use client";
import React from "react";
import styles from "./MobileMenu.module.css";

import NavList from "../NavList/NavList";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../../Logo/Logo";
type Props = { isOpen: boolean; onClose: () => void };
export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <div className={`${styles.mobMenu} ${isOpen ? styles.open : ""}`}>
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
        <NavList variant="mobileMenu" />
        <AuthNav variant="mobMenu" />
      </div>{" "}
    </div>
  );
}
