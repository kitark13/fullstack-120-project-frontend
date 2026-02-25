'use client';

import Image from 'next/image';
import styles from './TravellersStoriesItem.module.css';
import { Author } from '@/components/stories/PopularStories/PopularStories';
import { Story } from '@/types/index';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addToFavorite, removeFromFavorite } from '@/lib/api/clientApi';

// interface ButtonProp {
//   children: React.ReactNode;
//   className: string;
// }

interface TravellersStoriesItemProps {
  story: Story;
  isAuthenticated: string | null;
}
interface StoryAuthorProps {
  author: Author;
  date: string;
  savedNumber: number;
}

export function TravellersStoriesItem({
  story,
  isAuthenticated,
}: TravellersStoriesItemProps) {
  const [isSaved, setIsSaved] = useState<boolean>(story.isSaved);
  const [favoriteCount, setFavoriteCount] = useState<number>(
    story.favoriteCount,
  );

  async function handleToggleLike() {
    if (!!isAuthenticated) {
      const prevSaved = isSaved;
      setIsSaved((isSaved) => !isSaved);

      if (!prevSaved) {
        await addToFavorite(story._id); //додавання до улюблених
        setFavoriteCount((prev) => prev + 1);
      } else {
        await removeFromFavorite(story._id); //видалення з улюблених
        setFavoriteCount((prev) => prev - 1);
      }
    } else {
      alert(
        'Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису — зареєструйтесь.',
      );
    }
  }

  return (
    <li className={styles.storyCard}>
      <Image
        src={story.img}
        alt={story.title}
        className={styles.storyImg}
        width={400}
        height={200}></Image>
      <div className={styles.storyContent}>
        <div className={styles.content}>
          <span className={styles.storyRegion}>{story.category.name}</span>
          <h3>{story.title}</h3>
          <p className={styles.storyArticle}>{story.article}</p>
        </div>
        <StoryAuthor
          author={story.ownerId}
          date={new Date(story.date).toLocaleDateString('uk-UA')}
          savedNumber={favoriteCount}
        />
        <div className={styles.cardActions}>
          <Link
            className={styles.storyViewBtn}
            href={`/stories/${story._id}`}>
            Переглянути статтю
          </Link>

          <button
            className={isSaved ? styles.likeBtnSaved : styles.likeBtnNotSaved}
            onClick={handleToggleLike}>
            <svg
              className={isSaved ? styles.iconSaved : styles.iconNotSaved}
              width={24}
              height={24}>
              <use href="/sprite-final-opt.svg#icon-bookmark" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

function StoryAuthor({ author, date, savedNumber }: StoryAuthorProps) {
  return (
    <div className={styles.storyMeta}>
      <Image
        src={author.avatarUrl}
        alt={author.name}
        width={48}
        height={48}
        className={styles.avatar}></Image>
      <div>
        <h6 className={styles.author}>{author.name}</h6>
        <div className={styles.meta}>
          <span className={styles.favoriteCount}>{date}</span>
          <span className={styles.point}>●</span>
          <span className={styles.savedNumber}>{savedNumber}</span>
          <svg
            width={24}
            height={24}>
            <use href="/sprite-final-opt.svg#icon-bookmark" />
          </svg>
        </div>
      </div>
    </div>
  );
}
