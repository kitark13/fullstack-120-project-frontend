import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import styles from "./OurTravellers.module.css";
import Link from "next/link";

/*
Секція "Наші Мандрівники" для головної сторінки.
 */
export default function OurTravellersPage() {
  return (
    <section className={styles.travellersSection}>
      <div className="container">
        <h2 className={styles.travellersTitle}>Наші Мандрівники</h2>

        {/* обмежуємо список */}
        <TravellersList limit={4} showLoadMore={false} />

        <div className={styles.btnWrap}>
          <Link className={styles.trlBtn} href="/travellers">
            Переглянути всіх
          </Link>
        </div>
      </div>
    </section>
  );
}
