"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/index";
import useAuthStore from "@/lib/store/authStore";
import css from "./OwnStories.module.css";
import { api } from "@/lib/api/api";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

export default function OwnStories() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authUser = useAuthStore((state) => state.user);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prefetchSavedStories = async () => {
    try {
      await api.get("/stories/saved?page=1&limit=50");
    } catch {
      // noop
    }
  };

  // useEffect(() => {
  //   const fetchOwnStories = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await api.get<{ data: Story[] }>("/stories/my");
  //       setAllStories(res.data.data || []);
  //       setDisplayCount(ITEMS_PER_PAGE);
  //       setError(null);
  //     } catch (err) {
  //       console.error("Failed to load own stories:", err);
  //       setError("Не вдалося завантажити ваші історії");
  //       setAllStories([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (isAuthenticated) {
  //     fetchOwnStories();
  //     prefetchSavedStories();
  //   } else {
  //     setLoading(false);
  //     setAllStories([]);
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setAllStories([]);
      return;
    }

    const fetchOwnStories = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Story[] }>("/stories/my");
        setAllStories(res.data.data || []);
        setDisplayCount(ITEMS_PER_PAGE);
        setError(null);
      } catch (err: unknown) {
        let status: number | undefined;

        if (axios.isAxiosError(err)) {
          status = err.response?.status;
        }

        setError(
          status === 401
            ? "Увійдіть, щоб переглянути ваші історії"
            : "Не вдалося завантажити ваші історії",
        );

        setAllStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnStories();
    prefetchSavedStories();
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
    <div className={css.wrapper}>
      <ul className={css.storiesList}>
        {displayedStories.map((story) => (
          <OwnStoryCard key={story._id} story={story} authUser={authUser} />
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

interface StoryAuthorProps {
  author: Author;
  date: string;
  savedNumber: number;
}

export type Author = {
  _id: string;
  name: string;
  avatarUrl: string;
};

function OwnStoryCard({
  story,
  authUser,
}: {
  story: Story;
  authUser: ReturnType<typeof useAuthStore.getState>["user"];
}) {
  const storyOwner =
    story.ownerId && typeof story.ownerId === "object" ? story.ownerId : null;

  const author: Author = {
    _id: storyOwner?._id || authUser?._id || "",
    name: storyOwner?.name || authUser?.name || "Unknown",
    avatarUrl:
      storyOwner?.avatarUrl ||
      authUser?.avatarUrl ||
      "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  };

  return (
    <li className={css.storyCard}>
      <Image
        src={
          story.img ||
          "https://ac.goit.global/fullstack/react/default-avatar.jpg"
        }
        alt={story.title}
        className={css.storyImg}
        width={400}
        height={223}
      />
      <div className={css.storyContent}>
        <div className={css.content}>
          <span className={css.storyRegion}>
            {story.category?.name || "Без категорії"}
          </span>
          <h3>{story.title}</h3>
          <p className={css.storyArticle}>{story.article}</p>
        </div>
        <StoryAuthor
          author={author}
          date={new Date(story.date).toLocaleDateString("uk-UA")}
          savedNumber={story.favoriteCount || 0}
        />
        <div className={css.cardActions}>
          <Link className={css.storyViewBtn} href={`/stories/${story._id}`}>
            Переглянути статтю
          </Link>

          <Link className={css.editBtn} href={`/stories/${story._id}/edit`}>
            <svg width={24} height={24}>
              <use href="/sprite-final-opt.svg#icon-edit" />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}

function StoryAuthor({ author, date, savedNumber }: StoryAuthorProps) {
  return (
    <div className={css.storyMeta}>
      <Image
        src={
          author?.avatarUrl ||
          "https://ac.goit.global/fullstack/react/default-avatar.jpg"
        }
        alt={author?.name || "Unknown"}
        width={48}
        height={48}
        className={css.avatar}
      />
      <div>
        <h6 className={css.author}>{author?.name || "Unknown"}</h6>
        <div className={css.meta}>
          <span className={css.favoriteCount}>{date}</span>
          <span className={css.point}>●</span>
          <span className={css.savedNumber}>{savedNumber}</span>
          <svg width={24} height={24}>
            <use href="/sprite-final-opt.svg#icon-bookmark" />
          </svg>
        </div>
      </div>
    </div>
  );
}
