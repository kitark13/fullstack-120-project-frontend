import Image from "next/image";
import css from "./GlobalLoader.module.css";

const GlobalLoader = () => {
  return (
    <div className={css.loadingContainer}>
      <div className={css.magicBox}>
        <div className={css.orbit}></div>
        <div className={css.logoWrapper}>
          <div className={css.glow}></div>
          <Image
            className={css.logoIcon}
            width={60}
            height={60}
            src="/logo-test.svg"
            alt="podorojniki-logo"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
