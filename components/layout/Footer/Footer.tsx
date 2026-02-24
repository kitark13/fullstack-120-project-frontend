import React from "react";
import css from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import NavList from "../NavList/NavList";
import Logo from "../../Logo/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <div className={`${css.footerContainer} container`}>
        <div className={css.footerMain}>
          <div className={css.footerNav}>
            <Logo variant="footer" />
            <ul className={css.footerSoclinkList}>
              {" "}
              <li className={css.footerSoclinkItem}>
                {" "}
                <a
                  href="https://www.facebook.com/"
                  className={css.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  {" "}
                  <svg className={css.socialIcon} width="32" height="32">
                    {" "}
                    <use xlinkHref="/sprite-final-opt.svg#icon-facebook"></use>{" "}
                  </svg>{" "}
                </a>{" "}
              </li>{" "}
              <li className={css.footerSoclinkItem}>
                {" "}
                <a
                  href="https://www.instagram.com/"
                  className={css.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram"
                >
                  {" "}
                  <svg className={css.socialIcon} width="32" height="32">
                    {" "}
                    <use xlinkHref="/sprite-final-opt.svg#icon-instagram"></use>{" "}
                  </svg>{" "}
                </a>{" "}
              </li>{" "}
              <li className={css.footerSoclinkItem}>
                {" "}
                <a
                  href="https://x.com/"
                  className={css.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="x"
                >
                  {" "}
                  <svg className={css.socialIcon} width="32" height="32">
                    {" "}
                    <use xlinkHref="/sprite-final-opt.svg#icon-x"></use>{" "}
                  </svg>{" "}
                </a>{" "}
              </li>{" "}
              <li className={css.footerSoclinkItem}>
                {" "}
                <a
                  href="https://www.youtube.com/"
                  className={css.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="youtube"
                >
                  {" "}
                  <svg className={css.socialIcon} width="32" height="32">
                    {" "}
                    <use xlinkHref="/sprite-final-opt.svg#icon-youtube"></use>{" "}
                  </svg>{" "}
                </a>{" "}
              </li>{" "}
            </ul>
            <NavList variant="footer" />
          </div>
        </div>

        <p className={css.footerCopyrigthText}>
          &copy; 2026 Подорожники. Усі права захищені.
        </p>
      </div>
    </footer>
  );
};
