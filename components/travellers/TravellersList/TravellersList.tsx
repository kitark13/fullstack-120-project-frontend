'use client';

import { User } from '@/types/user';
import Card from '@/components/common/Card/Card';
import styles from './TravellersList.module.css';

interface TravellersListProps {
  users: User[];
}

export default function TravellersList({ users }: TravellersListProps) {
  return (
    <ul className={styles.travellers__list}>
      {users &&
        users.map((user) => {
          return (
            <li
              className={styles.travellers__item}
              key={user._id}>
              <Card user={user} />
            </li>
          );
        })}
    </ul>
  );
}
