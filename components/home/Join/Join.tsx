import styles from "./Join.module.css";

export default function Join() {
  const token = localStorage.getItem("token");
  const isAuthorised = !!token;

  {
    isAuthorised ? "Збережені" : "Зареєструватися";
  }
  const navigated = useNavigate();

  const handleClick = () => {
    if (isAuthorised) { 
      navigated("/auth/profile/saved");
    }
    else {
      navigated("/auth/register");
    }
  return (
    <section className={styles.join} id="join">
      <h2>Приєднуйтесь до нашої спільноти</h2>
      {/* Описова частина */}
      {/* Кнопка для НЕавторизованого: "Зареєструватися" */}
      {/* Кнопка для авторизованого: "Збережені" */}
    </section>
  );
}
