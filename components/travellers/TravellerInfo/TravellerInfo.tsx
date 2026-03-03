"use client";

import { User } from "@/types/user";
import useAuthStore from "@/lib/store/authStore";
import styles from "./TravellerInfo.module.css";
import Image from "next/image";

interface TravellerInfoProps {
  user?: User;
}

export default function TravellerInfo({ user }: TravellerInfoProps) {
  const authUser = useAuthStore((state) => state.user);
  const userData = user || authUser;

  if (!userData) {
    return <div className={styles.traveller_container}>Завантаження...</div>;
  }

  return (
    <div className={styles.traveller_container}>
      <Image
        className={styles.traveller_avatar}
        src={userData.avatarUrl}
        alt="Avatar"
        width={199}
        height={199}
      />
      <div className={styles.traveller_data}>
        <h2 className={styles.traveller_name}>{userData.name}</h2>
        <p className={styles.traveller_description}>{userData.description}</p>
      </div>
    </div>
  );
}
