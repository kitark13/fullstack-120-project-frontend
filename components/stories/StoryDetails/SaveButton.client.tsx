"use client";

import Button from "@/components/common/Button/Button";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthNavModal from "@/components/modals/AuthNavModal/AuthNavModal";

interface SaveButtonProps {
  storyId: string;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveButton({
  storyId,
  isSaved,
  setIsSaved,
}: SaveButtonProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (shouldSave: boolean) =>
      shouldSave ? addToFavorite(storyId) : removeFromFavorite(storyId),

    onMutate: (shouldSave) => {
      setIsSaved(shouldSave);
    },

    onError: (_, shouldSave) => {
      setIsSaved(!shouldSave);
      alert("Помилка. Спробуйте ще раз.");
    },

    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    const shouldSave = !isSaved;
    mutation.mutate(shouldSave);
  };

  const handleLogIn = () => {
    setIsModalOpen(false);
    router.push("/auth/login");
  };

  const handleRegister = () => {
    setIsModalOpen(false);
    router.push("/auth/register");
  };

  return (
    <>
      <Button
        type="button"
        variant={isSaved ? "saved" : "primary"}
        onClick={handleClick}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "..." : isSaved ? "Збережено" : "Зберегти"}
      </Button>
      <AuthNavModal
        isOpen={isModalOpen}
        onLogIn={handleLogIn}
        onRegister={handleRegister}
        onClose={() => setIsModalOpen(false)}
        title="Авторизація"
        message="Щоб зберегти статтю у вибране, вам необхідно увійти в систему або зареєструватися."
      />
    </>
  );
}
