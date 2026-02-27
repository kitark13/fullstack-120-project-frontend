import { TravellersList } from "@/components/travellers/TravellersList/TravellersList";
import styles from "./TravellersPage.module.css";

export default function TravellersPage() {
  return (
    <section className={styles.travellers}>
      <div className="container">
        <h2 className={styles.travellers__title}>Мандрівники</h2>
        <TravellersList />
      </div>
    </section>
  );
}
