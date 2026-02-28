"use client";

import Button from "@/components/common/Button/Button";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface SaveButtonProps {
  storyId: string;
  initialIsSaved: boolean;
}

export default function SaveButton({
  storyId,
  initialIsSaved,
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Отримуємо стан авторизації із Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleSave = async () => {
    // console.log("Клік по кнопці! Статус авторизації:", isAuthenticated); //прибрати
    // Перевірка авторизації
    if (!isAuthenticated) {
      alert("Ви не авторизовані! Тут має відкритися модалка."); //  Тимчасовий alert
      // openAuthModal(); //
      toast.error("Будь ласка, увійдіть у систему");
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await removeFromFavorite(storyId);
        setIsSaved(false);
        toast.success("Видалено зі збереженого");
      } else {
        await addToFavorite(storyId);
        setIsSaved(true);
        toast.success("Збережено!");
      }
      router.refresh(); // оновити дані
    } catch {
      toast.error("Помилка при збереженні");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={isSaved ? "saved" : "primary"}
      onClick={handleSave}
      disabled={isLoading}
    >
      {isLoading ? "..." : isSaved ? "Збережено" : "Зберегти"}
    </Button>
  );
}
