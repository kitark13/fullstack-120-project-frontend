import styles from "./OurTravellers.module.css";

export default function OurTravellers() {
  return (
    <section className={styles.ourTravellers}>
      <h2>Наші Мандрівники</h2>
      <TravellersList
          initialPerPage={4}
          loadMorePerPage={4}
          showLoadMoreOnMobile={false}
        />
      {/* Посилання "Переглянути всіх" */}
    </section>
  );
}


// import TravellersList from '@/components/travellers/TravellersList/TravellersList';
// import styles from '@/components/travellers/TravellersList/TravellersList.module.css';

// export default function OurTravellersPage() {
//   return (
//     <section className={styles.our__travellers}>
//       <div className="container">
//         <h2 className={styles.travellers__title}>Наші Мандрівники</h2>
//         <TravellersList
//           initialPerPage={4}
//           loadMorePerPage={4}
//           showLoadMoreOnMobile={false}
//         />
//       </div>
//     </section>
//   );
// }