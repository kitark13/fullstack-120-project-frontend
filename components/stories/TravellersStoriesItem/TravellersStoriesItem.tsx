'use client';

import Image from 'next/image';
import styles from './TravellersStoriesItem.module.css';
import { Story } from '@/types/index';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addToFavorite, removeFromFavorite } from '@/lib/api/clientApi';
import AuthNavModal from '@/components/modals/AuthNavModal/AuthNavModal';

import { useRouter } from 'next/navigation';

interface TravellersStoriesItemProps {
  story: Story;
  isAuthenticated: boolean;
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

export function TravellersStoriesItem({
  story,
  isAuthenticated,
}: TravellersStoriesItemProps) {
  const [isSaved, setIsSaved] = useState<boolean>(story.isSaved);
  const [favoriteCount, setFavoriteCount] = useState<number>(
    story.favoriteCount,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const mutationAdd = useMutation({
    mutationFn: (storyId: string) => addToFavorite(storyId),
    onMutate: async () => {
      setIsSaved(true);
      setFavoriteCount((prev) => prev + 1);
    },
    onError: () => {
      //  якщо щось з базою пішло не так, повертаємо ui як було
      setIsSaved(false);
      setFavoriteCount((prev) => prev - 1);
      alert(
        'Упсс...Збереження до улюблених НЕ пройшло успішно. Спробуйте ще раз',
      );
    },
    onSuccess: () => {
      console.log('Story was added to favorite successfully');
    },
  });

  const mutationRemove = useMutation({
    mutationFn: (storyId: string) => removeFromFavorite(storyId),
    onMutate: async () => {
      setIsSaved(false);
      setFavoriteCount((prev) => prev - 1);
    },
    onError: () => {
      setIsSaved(true);
      setFavoriteCount((prev) => prev + 1);
      alert(
        'Упсс...Видалення з улюблених НЕ пройшло успішно. Спробуйте ще раз',
      );
    },
    onSuccess: () => {
      console.log('Story was removed from favorite successfully');
    },
  });

  function handleToggleLike() {
    if (isAuthenticated) {
      if (!isSaved) {
        //якщо до цього було не збережено
        mutationAdd.mutate(story._id);
      } else {
        mutationRemove.mutate(story._id);
      }
    } else {
      setIsModalOpen(true);
      // alert(
      //   'Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису — зареєструйтесь.',
      // );
    }
  }

  const isLoading = mutationAdd.isPending || mutationRemove.isPending;

  const handleLogIn = async () => {
    setIsModalOpen(false);
    router.push('/auth/login');
  };

  const handleRegister = async () => {
    setIsModalOpen(false);
    router.push('/auth/register');
  };

  return (
    <>
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
              onClick={handleToggleLike}
              disabled={isLoading}>
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
      <AuthNavModal
        isOpen={isModalOpen}
        onLogIn={handleLogIn}
        onRegister={handleRegister}
        onClose={() => setIsModalOpen(false)}
        title="Помилка під час збереження"
        message="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
        LoginText="Увійти"
        RegisterText="Зареєструватись"
      />
    </>
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
