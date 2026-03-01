"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/index";
import { TravellersStoriesItem } from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import useAuthStore from "@/lib/store/authStore";
import css from "./SavedStories.module.css";
import { api } from "@/lib/api/api";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function SavedStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Story[] }>("/stories/saved");
        setAllStories(res.data.data || []);
        setDisplayCount(ITEMS_PER_PAGE);
        setError(null);
      } catch (err) {
        console.error("Failed to load saved stories:", err);
        setError("Не вдалося завантажити збережені історії");
        setAllStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSavedStories();
    }
  }, [isAuthenticated]);

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
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
    <div>
      <ul className={css.storiesList}>
        {displayedStories.map((story) => (
          <TravellersStoriesItem
            key={story._id}
            story={story}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </ul>
      {hasMore && (
        <button className={css.showMoreButton} onClick={handleShowMore}>
          Показати ще
        </button>
      )}
    </div>
  );
}
