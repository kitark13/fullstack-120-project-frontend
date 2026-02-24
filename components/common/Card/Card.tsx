import css from './Card.module.css';
import { User } from '@/types/user';
import Image from 'next/image';
// import Link from 'next/link';
import Button from '../Button/Button';

interface Props {
  user: User;
}

export default function Card({ user }: Props) {
  return (
    <div className={css.card}>
      <Image
        src={user.avatarUrl}
        alt={user.name}
        className={css.photo}
        width={112}
        height={112}
      />
      <div className={css.info}>
        <h3 className={css.title}>{user.name}</h3>
        <p className={css.description}>{user.description}</p>
        <Button
          className={css.btn}
          size="large"
          href={`/travellers/${user._id}`}
        >
          Переглянути профіль
        </Button>
      </div>
    </div>
  );
}