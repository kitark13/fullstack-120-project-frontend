import { PopularStories } from "@/components/stories/PopularStories/PopularStories";
import StoryDetails from "@/components/stories/StoryDetails/StoryDetails";
import { getStoryByIdServer } from "@/lib/api/serverApi";
import { notFound } from "next/navigation";
import styles from "./StoryPage.module.css";

interface Props {
  params: Promise<{ storyId: string }>;
}

export default async function StoryPage({ params }: Props) {
  const { storyId } = await params;

  const storyRes = await getStoryByIdServer(storyId);

  if (!storyRes || !storyRes.data) {
    notFound();
  }

  return (
    <>
      <StoryDetails story={storyRes.data} initialIsSaved={storyRes.isSaved} />
      <section className={styles.popularStories}>
        <div className="container">
          <PopularStories />
        </div>
      </section>
    </>
  );
}
