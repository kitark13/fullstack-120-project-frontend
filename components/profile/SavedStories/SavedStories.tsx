"use client";

import { useEffect, useState, useRef } from "react";
import { Story } from "@/types/index";
import { TravellersStories } from "@/components/stories/TravellersStories/TravellersStories";
import useAuthStore from "@/lib/store/authStore";
import css from "./SavedStories.module.css";
import { api } from "@/lib/api/api";
import Link from "next/link";

export default function SavedStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasLoadedRef = useRef(false);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [displayCount, setDisplayCount] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1440 ? 6 : 4;
    }
    return 6;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleStoryRemoved = (storyId: string) => {
    setTimeout(() => {
      setAllStories((prev) => prev.filter((story) => story._id !== storyId));
    }, 2000);
  };

  const prefetchOwnStories = async () => {
    try {
      await api.get("/stories/my");
    } catch {
      // noop
    }
  };

  // Визначаємо к-ть карточок залежно від розміру екрану
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1440 ? 6 : 4;
    }
    return 6;
  };

  // Одночасно відстежуємо resize і завантажуємо дані
  useEffect(() => {
    const handleResize = () => {
      const itemsPerPage = getItemsPerPage();
      setDisplayCount(itemsPerPage);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        setLoading(true);
        let allStoriesData: Story[] = [];
        let page = 1;
        let hasMore = true;

        // Завантажуємо всі сторінки по 50 (макс лімітт на беку)
        while (hasMore) {
          const res = await api.get<{
            data: Story[];
            pagination?: { totalPages: number };
          }>(`/stories/saved?page=${page}&limit=50`);
          const stories = res.data.data || [];

          if (stories.length === 0) {
            hasMore = false;
            break;
          }

          allStoriesData = [...allStoriesData, ...stories];

          // Перевіряємо чи є ще сторінки
          const totalPages = res.data.pagination?.totalPages || 1;
          if (page >= totalPages) {
            hasMore = false;
          } else {
            page++;
          }
        }

        // Встановлюємо isSaved=true для всіх історій
        const storiesWithSavedFlag = allStoriesData.map((story) => ({
          ...story,
          isSaved: true,
        }));
        setAllStories(storiesWithSavedFlag);
        setError(null);
      } catch (err) {
        console.error("Failed to load saved stories:", err);
        setError("Не вдалося завантажити збережені історії");
        setAllStories([]);
      } finally {
        setLoading(false);
      }
    };

    // Завантажуємо лише один раз, коли користувач залогінений
    if (isAuthenticated && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      fetchSavedStories();
      prefetchOwnStories();
    } else if (!isAuthenticated) {
      // Скидаємо flag коли користувач вийшов
      hasLoadedRef.current = false;
      setLoading(false);
      setAllStories([]);
    }
  }, [isAuthenticated]);

  const handleShowMore = () => {
    const itemsPerPage = getItemsPerPage();
    setDisplayCount((prev) => prev + itemsPerPage);
  };

  const displayedStories = allStories.slice(0, displayCount);
  const hasMore = displayCount < allStories.length;

  if (loading) {
    return <div className={css.message}>Завантаження...</div>;
  }

  if (error) {
    return <div className={css.message}>{error}</div>;
  }

  if (allStories.length === 0) {
    return (
      <div className={css.emptyState}>
        <h2 className={css.emptyStateTitle}>
          У вас ще немає збережених історій, мершій збережіть вашу першу
          історію!
        </h2>
        <Link href="/stories" className={css.exploreButton}>
          До історій
        </Link>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <TravellersStories
        stories={displayedStories}
        isAuthenticated={isAuthenticated}
        onStoryRemoved={handleStoryRemoved}
      />
      {hasMore && (
        <button className={css.showMoreButton} onClick={handleShowMore}>
          Показати ще
        </button>
      )}
    </div>
  );
}
