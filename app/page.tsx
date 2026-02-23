// import Image from "next/image";
// import css from "./page.module.css";
import Join from "@/components/home/Join/Join";

export default function Home() {
  return (
    <main>
      <section>
        <div className="container">
          <h1>Подорожники</h1>
          <p>
            Подорожники — додаток для збереження та перегляду ваших подорожей
          </p>
        </div>
      </section>
      <Join />
    </main>
  );
}
