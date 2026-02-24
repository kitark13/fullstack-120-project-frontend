import TravelersList from '@/components/travellers/TravellersList/TravellersList';
import css from './TravellersPage.module.css';

export default function TravellersPage() {
  return (
    <div className="container">
      <h2 className={`center ${css.title}`}>Мандрівники</h2>
      <TravelersList />
    </div>
  );
}