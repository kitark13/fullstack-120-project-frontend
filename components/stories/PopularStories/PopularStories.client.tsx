'use client';

import { TravellersStoriesItem } from '@/components/stories/TravellersStoriesItem/TravellersStoriesItem';
import styles from './PopularStories.module.css';
import { Story } from '@/types/index';
import { useEffect, useState } from 'react';
import useAuthStore from '@/lib/store/authStore';

interface PopularStoriesClientProps {
  stories: Story[];
}

export function PopularStoriesClient({ stories }: PopularStoriesClientProps) {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || null;
  const isAuthenticated = !!userId;

  const storiesWithFlag = isAuthenticated
    ? stories.map((story) => ({
        ...story,
        isSaved: user?.savedStories?.includes(story._id) || false,
      }))
    : stories;

  const [visibleStories, setVisibleStories] = useState(storiesWithFlag);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setVisibleStories(storiesWithFlag);
      } else {
        setVisibleStories(storiesWithFlag.slice(0, 3));
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [storiesWithFlag]);

  return (
    <ul className={styles.storyList}>
      {visibleStories.map((story) => {
        return (
          <TravellersStoriesItem
            key={story._id}
            story={story}
            isAuthenticated={isAuthenticated}
          />
        );
      })}
    </ul>
  );
}
