import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подорожники",
  description:
    "Подорожники — додаток для збереження та перегляду ваших подорожей",
};

function NotFound() {
  return (
    <div>
      <h1>Помилка 404 - сторінку не знайдено</h1>
      <p>Вибачте. Сторінка, яку ви шукаєте, не існує</p>
    </div>
  );
}

export default NotFound;
