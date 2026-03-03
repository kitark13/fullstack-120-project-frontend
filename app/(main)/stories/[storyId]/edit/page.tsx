import styles from "./editStoryPage.module.css";
import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { getStoryByIdServer } from "@/lib/api/serverApi";

type PageProps = {
  params: Promise<{ storyId: string }>;
};

export default async function EditStoryPage({ params }: PageProps) {
  const { storyId } = await params;
  const storyRes = await getStoryByIdServer(storyId);

  return (
    <section className={styles.addStoryPage}>
      <div className="container">
        <h3 className={styles.title}>Редагувати історію</h3>
        <AddStoryForm mode="edit" initialStory={storyRes.data} />
      </div>
    </section>
  );
}
