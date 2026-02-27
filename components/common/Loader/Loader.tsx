import css from "./Loader.module.css";

const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${css.loaderWrapper} ${className}`}>
      <div className={css.spinner}>
        <div className={css.dot}></div>
        <div className={css.dot}></div>
        <div className={css.dot}></div>
      </div>
    </div>
  );
};

export default Loader;
