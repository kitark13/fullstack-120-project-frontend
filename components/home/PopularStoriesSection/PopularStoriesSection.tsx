import { PopularStories } from '@/components/stories/PopularStories/PopularStories';
import styles from './PopularStoriesSection.module.css';
import Link from 'next/link';

export default function PopularStoriesSection() {
  return (
    <section className={styles.popularStoriesSection}>
      <div className="container">
        <h2 className={styles.storiesTitle}>Популярні історії</h2>
        <PopularStories />
        <div className={styles.storiesSectionFooter}>
          <Link
            className={styles.lookAllBtn}
            href="/stories">
            Переглянути всі
          </Link>
        </div>
      </div>
    </section>
  );
}
