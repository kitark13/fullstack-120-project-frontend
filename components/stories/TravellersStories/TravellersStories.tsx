import { Story } from "@/types";
import { TravellersStoriesItem } from "../TravellersStoriesItem/TravellersStoriesItem";
import styles from "./TravellersStories.module.css";

interface TravellersStoriesProps {
  stories: Story[];
  isAuthenticated: boolean;
  onStoryRemoved?: (storyId: string) => void;
}

export function TravellersStories({
  stories,
  isAuthenticated,
  onStoryRemoved,
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
              onStoryRemoved={onStoryRemoved}
            />
          );
        })}
    </ul>
  );
}
