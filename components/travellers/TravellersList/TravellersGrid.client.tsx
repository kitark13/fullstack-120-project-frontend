"use client";

import React, { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/clientApi";
import styles from "./TravellersList.module.css";
import Card from "@/components/common/Card/Card";

interface GridProps {
  initialLimit: number;
  showLoadMore: boolean;
}

export default function TravellersGrid({
  initialLimit,
  showLoadMore,
}: GridProps) {
  const step = 4; // Стандартний крок підвантаження

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["travellers", initialLimit], // Ключ залежить від ліміту
      initialPageParam: 1,

      queryFn: ({ pageParam }) => {
        // Якщо це перша сторінка — використовуємо initialLimit
        const currentLimit = pageParam === 1 ? initialLimit : step;
        return getUsers({ page: pageParam, perPage: currentLimit });
      },

      getNextPageParam: (lastPage, allPages) => {
        const totalLoaded = allPages.reduce(
          (acc, page) => acc + (page.data?.length ?? 0),
          0,
        );
        const totalAvailable = lastPage.pagination?.total ?? 0;

        if (totalLoaded >= totalAvailable) return undefined;
        return Math.floor(totalLoaded / step) + 1;
      },

      select: (data) => data.pages.flatMap((page) => page.data ?? []),
    });

  const users = data || [];

  /**
   * Дозавантаження до 12 для великих екранів (тільки якщо увімкнена пагінація)
   */
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1440;
    if (
      showLoadMore &&
      isLargeScreen &&
      users.length === 8 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

  if (isLoading && users.length === 0) return <div>Завантаження...</div>;

  return (
    <>
      <ul className={styles.travellers__list}>
        {users.map((user) => (
          <li key={user._id}>
            <Card user={user} />
          </li>
        ))}
      </ul>

      {/* Показуємо кнопку тільки якщо пагінація дозволена */}
      {showLoadMore && hasNextPage && (
        <div className={styles.btnWrap}>
          <button
            className={styles.traveller__btn__more}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </button>
        </div>
      )}
    </>
  );
}
