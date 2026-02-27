import { TravellersList } from "@/components/travellers/TravellersList/TravellersList";
import styles from "./OurTravellers.module.css";
import Link from "next/link";

export default function OurTravellersPage() {
  return (
    <section className={styles.travellersSection}>
      <div className="container">
        <h2 className={styles.travellersTitle}>Наші Мандрівники</h2>
        <TravellersList showLoadMore={false} variant="section" />
        <div className={styles.btnWrap}>
          <Link className={styles.trlBtn} href="/travellers">
            Переглянути всі
          </Link>
        </div>
      </div>
    </section>
  );
}
