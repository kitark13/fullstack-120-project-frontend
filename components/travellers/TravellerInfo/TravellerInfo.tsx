import { User } from '@/types/user';
import styles from './TravellerInfo.module.css';
import Image from 'next/image';

interface TravellerInfoProps {
  user: User;
}

export default function TravellerInfo({ user }: TravellerInfoProps) {
  return (
    <div className={styles.traveller_container}>
      <Image
        className={styles.traveller_avatar}
        src={user?.avatarUrl}
        alt="Avatar"
        width={199}
        height={199}
      />
      <div className={styles.traveller_data}>
        <h2 className={styles.traveller_name}>{user.name}</h2>
        <p className={styles.traveller_description}>{user.description}</p>
      </div>
    </div>
  );
}
