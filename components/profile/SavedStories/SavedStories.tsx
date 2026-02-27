"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/index";
import { TravellersStoriesItem } from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import useAuthStore from "@/lib/store/authStore";
import css from "./SavedStories.module.css";
import { api } from "@/lib/api/api";
import Link from "next/link";

export default function SavedStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Story[] }>("/stories/saved");
        setStories(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load saved stories:", err);
        setError("Не вдалося завантажити збережені історії");
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSavedStories();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div className={css.message}>Завантаження...</div>;
  }

  if (error) {
    return <div className={css.message}>{error}</div>;
  }

  if (stories.length === 0) {
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
    <ul className={css.storiesList}>
      {stories.map((story) => (
        <TravellersStoriesItem
          key={story._id}
          story={story}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </ul>
  );
}
