'use client';

import styles from './TravellersPage.module.css';
import { getUsers } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import TravellersList from '@/components/travellers/TravellersList/TravellersList';

export function TravellersClient() {
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const step = 4; // Шаг подгрузки

  useEffect(() => {
    const setSize = () => {
      // 12 для десктопа, 8 для остальных
      if (window.innerWidth >= 1440) {
        setLimit(12);
      } else {
        setLimit(8);
      }
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  const {
    data: travellers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users', limit],

    queryFn: ({ pageParam = 1 }) => {
      const currentLimit = pageParam === 1 ? limit : step;
      return getUsers({
        limit: currentLimit,
        page: pageParam,
      });
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((acc, page) => acc + (page.data?.length ?? 0), 0);
      const totalAvailable = lastPage.pagination.total;

      if (totalLoaded >= totalAvailable) return undefined;

      // Рассчитываем следующую страницу для бэкенда (skip = (page-1)*limit)
      return (totalLoaded / step) + 1;
    },

    initialPageParam: 1,
    enabled: limit !== undefined,
  });

  // Фильтрация дубликатов по _id
  const uniqueTravellers = useMemo(() => {
    if (!travellers) return [];
    const all = travellers.pages.flatMap((page) => page.data);
    return all.filter((user, index, self) => 
        index === self.findIndex((u) => u._id === user._id)
    );
  }, [travellers]);

  return (
    <section className={styles.travellersSection}>
      <div className="container">
        <h2 className={styles.travellersTitle}>Мандрівники</h2>

        <TravellersList users={uniqueTravellers} />

        {hasNextPage && (
          <button
            className={styles.travellersLoadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
          </button>
        )}
      </div>
    </section>
  );
}
