"use client";

import Image from "next/image";
import { Story } from "@/types";
import styles from "./StoryDetails.module.css";
import SaveButton from "./SaveButton.client";
import useAuthStore from "@/lib/store/authStore";

interface StoryDetailsProps {
  story: Story;
  initialIsSaved: boolean;
}

export default function StoryDetails({
  story,
  initialIsSaved,
}: StoryDetailsProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const isSaved = isAuthenticated
    ? Boolean(user?.savedStories?.includes(story._id) || initialIsSaved)
    : false;

  if (!story || !story.img) return null;

  return (
    <article className={styles.article}>
      <div className="container">
        <h1 className={styles.title}>{story.title}</h1>

        <div className={styles.meta}>
          <div className={styles.metaInfoInner}>
            <div className={styles.infoGroup}>
              <p className={styles.metaItem}>
                <span className={styles.metaItemStrong}>Автор статті:</span>
                <span className={styles.metaItemGeneral}>
                  {story.ownerId?.name || "Мандрівник"}
                </span>
              </p>
              <p className={styles.metaItem}>
                <span className={styles.metaItemStrong}>Опубліковано:</span>
                <span className={styles.metaItemGeneral}>
                  {new Date(story.date).toLocaleDateString("sv-SE")}
                </span>
              </p>
            </div>
            <span className={styles.categoryBadge}>{story.category?.name}</span>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={story.img}
              alt={story.title}
              fill
              // priority
              sizes="(max-width: 767px) calc(100vw - 40px), 
         (max-width: 1439px) calc(100vw - 64px), 
         1312px"
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.textBlock}>{story.article}</div>

          <aside className={styles.saveAside}>
            <div className={styles.saveCard}>
              <p className={styles.saveTitle}>Збережіть собі історію</p>
              <p className={styles.saveText}>
                Вона буде доступна у вашому профілі у розділі збережене
              </p>

              <SaveButton storyId={story._id} initialIsSaved={isSaved} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
