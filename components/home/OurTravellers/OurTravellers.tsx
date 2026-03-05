import { getUsersServer } from '@/lib/api/serverApi';
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import styles from "./OurTravellers.module.css";
import Link from "next/link";

export default async function OurTravellersPage() {
  let isError = false;
  let data = null;
  try {
    data = await getUsersServer(1, 4);
  } catch (error) {
    console.error("Failed to load travellers:", error);
    isError = true;
  }

  return (
    <section className={styles.travellersSection}>
      <div className="container">
        <h2 className={styles.travellersTitle}>Наші Мандрівники</h2>

        {isError && <p>Не вдалося завантажити мандрівників...</p>}
        {data && <TravellersList users={data.data} />}

        <div className={styles.btnWrap}>
          <Link className={styles.trlBtn} href="/travellers">
            Переглянути всіх
          </Link>
        </div>
      </div>
    </section>
  );
}
