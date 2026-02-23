import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.heroTitle}>Відкрийте світ подорожей з нами!</h1>
        <p className={styles.heroDescription}>
          Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
          своїми історіями та отримувати натхнення для нових пригод. Відкрийте
          для себе нові місця та знайдіть однодумців!
        </p>
        <a href="#join" className={styles.heroButton}>Доєднатись</a>
      </div>
    </section>
  );
}
