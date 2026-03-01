"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/index";
import useAuthStore from "@/lib/store/authStore";
import css from "./OwnStories.module.css";
import { api } from "@/lib/api/api";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function OwnStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnStories = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Story[] }>("/stories/my");
        setAllStories(res.data.data || []);
        setDisplayCount(ITEMS_PER_PAGE);
        setError(null);
      } catch (err) {
        console.error("Failed to load own stories:", err);
        setError("Не вдалося завантажити ваші історії");
        setAllStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOwnStories();
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
          Ви ще нічого не публікували, поділіться своєю першою історією!
        </h2>

        <Link href="/stories/create" className={css.createButton}>
          Опублікувати історію
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className={css.storiesList}>
        {displayedStories.map((story) => (
          <OwnStoryCard key={story._id} story={story} />
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

function OwnStoryCard({ story }: { story: Story }) {
  return (
    <li className={css.storyCard}>
      <Image
        src={story.img}
        alt={story.title}
        className={css.storyImg}
        width={400}
        height={200}
      />
      <div className={css.storyContent}>
        <div className={css.content}>
          <span className={css.storyRegion}>{story.category.name}</span>
          <h3>{story.title}</h3>
          <p className={css.storyArticle}>{story.article}</p>
        </div>
        <div className={css.cardActions}>
          <Link className={css.storyViewBtn} href={`/stories/${story._id}`}>
            Переглянути статтю
          </Link>

          <Link className={css.editBtn} href={`/stories/${story._id}/edit`}>
            <svg width={24} height={24}>
              <use href="/sprite-final-opt.svg#icon-pencil" />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}
