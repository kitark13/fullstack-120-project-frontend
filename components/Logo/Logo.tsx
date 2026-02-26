import Image from "next/image";
import Link from "next/link";
import css from "./Logo.module.css";

interface LogoProps {
  variant: "footer" | "header" | "mobMenu" | "auth";
  theme?: "home" | "default";
}
const Logo = ({ variant, theme = "home" }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`${css.logoLink} ${variant === "footer" ? css.logoFoot : ""}
      ${variant === "mobMenu" ? css.logoMob : ""}
      ${variant === "auth" ? css.logoAuth : ""}
      `}
    >
      <Image
        className={css.logoIcon}
        width={23}
        height={23}
        src="/logo-test.svg"
        alt="podorojniki-logo"
      />
      <span
        className={`${css.logoText} ${variant === "footer" ? css.logoFootText : ""}
        ${variant === "mobMenu" ? css.logoMobText : ""}
        ${variant === "auth" ? css.logoAuthText : ""}
        ${variant === "header" && theme === "default" ? css.logoHeaderTextDefault : ""}
        `}
      >
        Подорожники
      </span>
    </Link>
  );
};
export default Logo;
