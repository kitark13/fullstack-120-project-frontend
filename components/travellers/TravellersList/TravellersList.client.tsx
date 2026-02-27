"use client";

import { User } from "@/types/user";
import Card from "@/components/common/Card/Card";
import styles from "./TravellersList.module.css";
import { useState, useEffect } from "react";

interface TravellersListClientProps {
  initialUsers: User[];
  totalPages: number;
  showLoadMore?: boolean;
  variant?: "page" | "section";
}

export function TravellersListClient({
  initialUsers,
  totalPages,
  showLoadMore = true,
  variant = "page",
}: TravellersListClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialUsers.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updatePerPage = () => {
      if (variant === "section") {
        setPerPage(4);
        return;
      }

      if (window.innerWidth >= 1024) {
        setPerPage(12);
      } else if (window.innerWidth >= 768) {
        setPerPage(8);
      } else {
        setPerPage(6);
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, [variant]);

  const loadMore = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("API URL not defined");
      return;
    }

    try {
      setLoading(true);

      const nextPage = page + 1;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${nextPage}&limit=4`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      setUsers((prev) => [...prev, ...data.data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more travellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = users.length < totalPages;

  return (
    <>
      <ul className={styles.travellers__list}>
        {users.slice(0, perPage + (page - 1) * 4).map((user) => (
          <li key={user._id}>
            <Card user={user} />
          </li>
        ))}
      </ul>

      {showLoadMore && hasMore && (
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className={styles.traveller__btn__more}
          >
            {loading ? "Завантаження..." : "Переглянути всі"}
          </button>
        </div>
      )}
    </>
  );
}
