"use client";

import type { User } from "@/types/user";
import Card from "@/components/common/Card/Card";
import styles from "./TravellersList.module.css";

interface Props {
  users: User[];
}

export function TravellersListClient({ users }: Props) {
  if (!users?.length) return <p>Users list is empty</p>;

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user._id}>
          <Card user={user} />
        </li>
      ))}
    </ul>
  );
}
