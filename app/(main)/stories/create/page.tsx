import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import styles from "./AddStoryPage.module.css";

export default function AddStoryPage() {
  return (
    <section className={styles.addStoryPage}>
      <div className="container">
        <h3 className={styles.title}>Створити нову історію</h3>
        <AddStoryForm />
      </div>
    </section>
  );
}
