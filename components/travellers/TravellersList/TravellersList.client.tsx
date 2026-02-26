"use client";

import { User } from "@/types/user";
import Card from "@/components/common/Card/Card";
import styles from "./TravellersList.module.css";
import { useState } from "react";

interface TravellersListClientProps {
  // users: User[];
  initialUsers: User[];
  totalPages: number;
}

export function TravellersListClient({
  initialUsers,
  totalPages,
}: TravellersListClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    try {
      setLoading(true);

      const nextPage = page + 1;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${nextPage}&limit=3`,
      );

      const data = await res.json();

      setUsers((prev) => [...prev, ...data.data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more users:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <>
      <ul className={styles.travellers__list}>
        {users.map((user) => (
          <li key={user._id}>
            <Card user={user} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className={styles.loadMoreBtn}
          >
            {/* {loading ? "Завантаження..." : "Показати ще"} */}
          </button>
        </div>
      )}
    </>
  );
}
