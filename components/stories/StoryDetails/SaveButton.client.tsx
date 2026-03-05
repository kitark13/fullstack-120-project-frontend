"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import AuthNavModal from "@/components/modals/AuthNavModal/AuthNavModal";
import { useToggleSavedStory } from "@/lib/hooks/useToggleSavedStory";

interface SaveButtonProps {
  storyId: string;
}

export default function SaveButton({ storyId }: SaveButtonProps) {
  const { isSaved, isLoading, toggle } = useToggleSavedStory(storyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const success = await toggle();

    if (!success) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={isSaved ? "saved" : "primary"}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "..." : isSaved ? "Збережено" : "Зберегти"}
      </Button>

      <AuthNavModal
        isOpen={isModalOpen}
        onLogIn={() => {
          setIsModalOpen(false);
          router.push("/auth/login");
        }}
        onRegister={() => {
          setIsModalOpen(false);
          router.push("/auth/register");
        }}
        onClose={() => setIsModalOpen(false)}
        title="Помилка під час збереження"
        message="Щоб зберегти статтю вам треба увійти або зареєструватися"
        LoginText="Увійти"
        RegisterText="Зареєструватись"
      />
    </>
  );
}
