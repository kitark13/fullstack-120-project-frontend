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
  limit: number;
}

export function TravellersListClient({
  initialUsers,
  totalPages,
  showLoadMore = true,
  variant = "page",
  limit,
}: TravellersListClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [visibleCount, setVisibleCount] = useState<number>(initialUsers.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial visibility based on screen width for "page" variant
    if (variant === "page") {
      const initialVisible = window.innerWidth < 1440 ? 8 : 12;
      setVisibleCount(initialVisible);
    } else {
      setVisibleCount(limit);
    }
  }, [variant, limit]);

  const loadMore = async () => {
    // 1. If we have already loaded users that are not visible yet, show them first
    if (visibleCount < users.length) {
      setVisibleCount((prev) => Math.min(prev + 4, users.length));
      return;
    }

    // 2. If we need to fetch more from the server
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("API URL not defined");
      return;
    }

    try {
      setLoading(true);

      const fetchLimit = 4;
      // Calculate the next page for fetching 4 users at a time.
      // skip = (page - 1) * limit => users.length = (nextPage - 1) * 4 => nextPage = (users.length / 4) + 1
      const nextPage = users.length / fetchLimit + 1;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${nextPage}&limit=${fetchLimit}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u._id));
        const newUsers = data.data.filter((u: User) => !existingIds.has(u._id));
        return [...prev, ...newUsers];
      });

      setVisibleCount((prev) => prev + fetchLimit);
    } catch (error) {
      console.error("Failed to load more travellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const visibleUsers = users.slice(0, visibleCount);
  const hasMore = users.length < totalPages || visibleCount < users.length;

  return (
    <>
      <ul className={styles.travellers__list}>
        {visibleUsers.map((user) => (
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
