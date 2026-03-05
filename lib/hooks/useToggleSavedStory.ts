import { useState } from "react";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";

export function useToggleSavedStory(storyId: string) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addSavedStory = useAuthStore((s) => s.addSavedStory);
  const removeSavedStory = useAuthStore((s) => s.removeSavedStory);

  const [isLoading, setIsLoading] = useState(false);

  const savedStories = user?.savedStories || [];
  const isSaved = savedStories.includes(storyId);

  const toggle = async () => {
    // console.log("CLICKED");
    // console.log("AUTH:", isAuthenticated);
    if (!isAuthenticated) {
      // console.log("BLOCKED BY AUTH");
      return false;
    }

    // console.log("ALLOWED");
    // 🟢 OPTIMISTIC UPDATE
    if (isSaved) {
      removeSavedStory(storyId);
    } else {
      addSavedStory(storyId);
    }

    try {
      setIsLoading(true);

      if (isSaved) {
        // console.log("CALL removeFromFavorite");
        await removeFromFavorite(storyId);
        // removeSavedStory(storyId);
      } else {
        console.log("CALL addToFavorite");
        await addToFavorite(storyId);
        // addSavedStory(storyId);
      }

      return true;
    } catch {
      // console.error("Toggle failed", error);
      // return false;
      // 🔴 ROLLBACK
      if (isSaved) {
        addSavedStory(storyId);
      } else {
        // setIsLoading(false);
        removeSavedStory(storyId);
      }
      // toast.error(error?.message || "Не вдалося змінити статус збереження");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isSaved, isLoading, toggle };
}
