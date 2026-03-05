"use client";

import styles from "./TravellerPublicClient.module.css";
import { TravellersStoriesItem } from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import Button from "@/components/common/Button/Button";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStoriesTraveller } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";

interface Props {
  travellerId: string;
}

export default function TravellerPublicClient({ travellerId }: Props) {
  const [perPage, setPerPage] = useState<number | undefined>(undefined);
  const userAuth = useAuthStore((state) => state.user);
  const userId = userAuth?._id || null;
  const isAuthenticated = !!userId;

  //Визначаємо розмір екрану від чого залежить к-ть карточок та вигляд меню категорій
  useEffect(() => {
    const setSize = () => {
      if (window.innerWidth < 768) {
        setPerPage(4);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        setPerPage(4);
      } else {
        setPerPage(6);
      }
    };

    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, []);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["traveller-stories", travellerId, perPage],

      queryFn: ({ pageParam = 1 }) =>
        getStoriesTraveller({ travellerId, page: pageParam, perPage }),

      initialPageParam: 1,
      refetchOnWindowFocus: false,

      getNextPageParam: (lastPage) => {
        const currentPage = Number(lastPage.pagination.page);
        const totalPages = Number(lastPage.pagination.totalPages);

        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      select: (data) => ({
        ...data,
        stories: data.pages.flatMap((page) => page.stories),
        user: data.pages[0]?.user,
      }),
      enabled: perPage !== undefined,
    });

  const stories = data?.stories ?? [];
  const user = data?.user;

  const storiesWithUser = stories.map((story) => ({
    ...story,
    ownerId: {
      _id: user?._id ?? "",
      name: user?.name ?? "",
      avatarUrl: user?.avatarUrl ?? "",
    }, // додаємо обʼєкт user до кожної історії
    isSaved: isAuthenticated
      ? user?.savedStories?.includes(story._id) || false
      : false,
  }));

  return (
    <section className={styles.stories_traveller}>
      <div className="container">
        {user && (
          <>
            {" "}
            <TravellerInfo user={user} />
            <div className={styles.traveller_container_stories}>
              <h2 className={styles.traveller_container_title}>
                Історії Мандрівника
              </h2>

              {storiesWithUser.length === 0 ? (
                <div className={styles.empty_state}>
                  <p className={styles.empty_text}>
                    Цей користувач ще не публікував історій
                  </p>
                  <Link href="/travellers">
                    <Button variant="primary" size="large">
                      Назад до мандрівників
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className={styles.traveller_stories_list}>
                  {storiesWithUser.map((story) => (
                    <TravellersStoriesItem
                      key={story._id}
                      isAuthenticated={isAuthenticated}
                      story={story}
                    />
                  ))}
                </ul>
              )}
              {hasNextPage && (
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    variant="primary"
                    size="large"
                  >
                    {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
