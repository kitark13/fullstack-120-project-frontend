'use client';
import styles from './Stories.module.css';
import { getCategories, getStoriesByCategory } from '@/lib/api/clientApi';
import { Category } from '@/types/category';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TravellersStories } from '@/components/stories/TravellersStories/TravellersStories';
import useAuthStore from '@/lib/store/authStore';
import Button from '@/components/common/Button/Button';

export function StoriesClient() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [chosenCategory, setChosenCategory] = useState<{
    id: string;
    name: string;
  }>({ id: 'all', name: 'Всі історії' });
  //   const [storiesWithFlag, setStoriesWithFlag] = useState<undefined | Story[]>(
  //     undefined,
  //   );
  const [limit, setLimit] = useState<number | undefined>(undefined);

  //Визначаємо розмір екрану від чого залежить к-ть карточок та вигляд меню категорій
  useEffect(() => {
    const setSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setLimit(9);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        setLimit(8);
      } else {
        setLimit(9);
      }
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  const {
    data: stories, //дістаємо всі історії на самому початку
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', chosenCategory.id, limit],

    queryFn: ({ pageParam = 1 }) =>
      getStoriesByCategory({
        limit,
        page: pageParam,
        category: chosenCategory.id === 'all' ? null : chosenCategory.id,
      }),

    getNextPageParam: (lastPage) => {
      //для пагінації
      const currentPage = Number(lastPage.pagination.page);
      const totalPages = Number(lastPage.pagination.totalPages);

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },

    initialPageParam: 1,
    // placeholderData: (previousData) => previousData, //поки не загрузились нові дані, старі залишаються (запобігання миготіню)
    enabled: limit !== undefined, //запрос робимо лише після того як дізнались розмір
  });

  const {
    data: categories,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  //перевірка чи залогінений користувач
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || null;
  const isAuthenticated = !!userId;

  //додаємо флажок збережених, якщо користувач залогінений
  const storiesWithFlag = useMemo(() => {
    if (!stories) return [];

    const allStories = stories.pages.flatMap((page) => page.data);

    return isAuthenticated
      ? allStories.map((story) => ({
          ...story,
          isSaved: user?.savedStories?.includes(story._id) || false,
        }))
      : allStories;
  }, [stories, isAuthenticated, user]);

  return (
    <section className={styles.travellersStoriesSection}>
      <div className="container">
        <h2 className={styles.storiesTitle}>Історії Мандрівників</h2>
        {categories && (
          <CategoryList
            isMobile={isMobile}
            categories={categories} //.data
            setCategory={setChosenCategory}
            chosenCategory={chosenCategory}
          />
        )}
        {
          <TravellersStories
            stories={storiesWithFlag}
            isAuthenticated={isAuthenticated}
          />
        }
        {hasNextPage && (
          <button
            className={styles.storiesLoadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
          </button>
        )}
      </div>
    </section>
  );
}

type chosenCategoryType = {
  id: string;
  name: string;
};
interface CategoryListProps {
  isMobile: boolean;
  categories: Category[];
  setCategory: ({ id, name }: chosenCategoryType) => void;
  chosenCategory: chosenCategoryType;
}

export function CategoryList({
  isMobile,
  categories,
  chosenCategory,
  setCategory,
}: CategoryListProps) {
  console.log('Categories', categories);
  return (
    <>
      {isMobile && (
        <MobileCategorySelect
          categories={categories}
          setCategory={setCategory}
          chosenCategory={chosenCategory}
        />
      )}
      {!isMobile && (
        <ul className={styles.categoryList}>
          <li
            className={styles.categoryItem}
            key={'all'}>
            <button
              className={`${styles.categoryItemBtn} ${
                chosenCategory.id === 'all' ? styles.categoryItemBtnActive : ''
              }`}
              onClick={() => {
                setCategory({ id: 'all', name: 'Всі історії' });
              }}>
              Всі історії
            </button>
          </li>
          {categories.map((category) => {
            return (
              <li key={category._id}>
                <button
                  className={`${styles.categoryItemBtn} ${
                    chosenCategory.id === category._id
                      ? styles.categoryItemBtnActive
                      : ''
                  }`}
                  onClick={() => {
                    setCategory({ id: category._id, name: category.name });
                  }}>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

interface MobileCategorySelectProps {
  categories: Category[];
  setCategory: ({ id, name }: chosenCategoryType) => void;
  chosenCategory: chosenCategoryType;
}

export default function MobileCategorySelect({
  categories,
  setCategory,
  chosenCategory,
}: MobileCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string, name: string) => {
    setCategory({ id, name });
    setIsOpen(false);
  };

  return (
    <div className={styles.mobileCategoryWrapper}>
      <label className={styles.mobileCategoryLabel}>Категорії</label>

      <div
        className={styles.dropdown}
        ref={wrapperRef}>
        <button
          type="button"
          className={styles.dropdownTrigger}
          onClick={() => setIsOpen((prev) => !prev)}>
          <span>{chosenCategory.name}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            {
              <svg className={styles.arrow}>
                {!isOpen ? (
                  <use href="/sprite-final-opt.svg#icon-keyboard-arrow-down" />
                ) : (
                  <use href="/sprite-final-opt.svg#icon-keyboard-arrow-up" />
                )}
              </svg>
            }
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => handleSelect('all', 'Всі історії')}>
              Всі історії
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                className={styles.dropdownItem}
                onClick={() => handleSelect(category._id, category.name)}>
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
