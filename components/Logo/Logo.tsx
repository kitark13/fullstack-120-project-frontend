import Image from "next/image";
import Link from "next/link";
import css from "./Logo.module.css";
const Logo = () => {
  return (
    <Link href="/" className={css.logoLink}>
      <Image
        className={css.logoIcon}
        width={23}
        height={23}
        src="/podorozniki-logo-opt.svg"
        alt="podorojniki-logo"
      />
      <span className={css.logoText}>Подорожники</span>
    </Link>
  );
};
export default Logo;
