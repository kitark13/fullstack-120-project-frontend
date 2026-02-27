"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/index";
import useAuthStore from "@/lib/store/authStore";
import css from "./OwnStories.module.css";
import { api } from "@/lib/api/api";
import Image from "next/image";
import Link from "next/link";

export default function OwnStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnStories = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Story[] }>("/stories/my");
        setStories(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load own stories:", err);
        setError("Не вдалося завантажити ваші історії");
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOwnStories();
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
          Ви ще нічого не публікували, поділіться своєю першою історією!
        </h2>

        <Link href="/stories/create" className={css.createButton}>
          Опублікувати історію
        </Link>
      </div>
    );
  }

  return (
    <ul className={css.storiesList}>
      {stories.map((story) => (
        <OwnStoryCard key={story._id} story={story} />
      ))}
    </ul>
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
