import { Story } from '@/types';
import { TravellersStoriesItem } from '../TravellersStoriesItem/TravellersStoriesItem';
import styles from './TravellersStories.module.css';

interface TravellersStoriesProps {
  stories: Story[];
  isAuthenticated: boolean;
}

export function TravellersStories({
  stories,
  isAuthenticated,
}: TravellersStoriesProps) {
  return (
    <ul className={styles.allStoriesList}>
      {stories &&
        stories.map((story) => {
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
