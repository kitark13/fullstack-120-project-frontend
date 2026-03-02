"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useAuthStore from "@/lib/store/authStore";
import PageToggle from "@/components/profile/PageToggle/PageToggle";
import { updateUser, updateUserAvatar } from "@/lib/api/clientApi";
import css from "./TravellerInfo.module.css";

export default function TravellerInfo() {
  const user = useAuthStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  let userName = "";
  let userDescription = "";
  if (user) {
    if (
      "data" in user &&
      typeof user.data === "object" &&
      user.data !== null &&
      "name" in user.data
    ) {
      userName = (user.data as { name: string }).name;
      userDescription =
        (user.data as { description?: string }).description || "";
    } else if ("name" in user && typeof user.name === "string") {
      userName = user.name;
      userDescription = (user as { description?: string }).description || "";
    }
  }

  const userAvatar =
    user && "avatarUrl" in user && typeof user.avatarUrl === "string"
      ? user.avatarUrl
      : user &&
          "data" in user &&
          typeof user.data === "object" &&
          user.data !== null &&
          "avatarUrl" in user.data &&
          typeof user.data.avatarUrl === "string"
        ? user.data.avatarUrl
        : undefined;

  return (
    <>
      <div className={css.travellerInfoWrapper}>
        <div className={css.travellerInfoContent}>
          <div className={css.userBlock}>
            <Image
              src={userAvatar || "/default-avatar.png"}
              alt={userName}
              className={css.avatar}
              width={199}
              height={199}
            />
            <div className={css.infoContent}>
              <h1 className={css.userName}>{userName}</h1>
              {userDescription && (
                <p className={css.userDescription}>{userDescription}</p>
              )}
            </div>
          </div>
          <button
            className={css.editButton}
            type="button"
            aria-label="Редагувати профіль"
            onClick={() => setIsEditModalOpen(true)}
          >
            Редагувати профіль
          </button>
        </div>
      </div>
      <PageToggle />

      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}

function EditProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Ініціалізація полів при відкритті модалки
  useEffect(() => {
    if (user) {
      const userData = user as {
        name?: string;
        description?: string;
        avatarUrl?: string;
        data?: { name?: string; description?: string; avatarUrl?: string };
      };
      const userName = ("name" in user ? user.name : userData.data?.name) || "";
      const userDesc =
        ("description" in user
          ? user.description
          : userData.data?.description) || "";
      const userAvatar =
        ("avatarUrl" in user ? user.avatarUrl : userData.data?.avatarUrl) || "";
      setName(userName);
      setDescription(userDesc);
      setAvatarPreview(userAvatar);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Перевірка розміру (макс 500KB згідно бекенду)
      if (file.size > 500 * 1024) {
        setError("Розмір файлу не повинен перевищувати 500KB");
        return;
      }

      // Перевірка типу
      if (!file.type.startsWith("image/")) {
        setError("Можна завантажувати лише зображення");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Спочатку оновлюємо аватарку якщо вибрана
      if (avatarFile) {
        await updateUserAvatar(avatarFile);
      }

      // Потім оновлюємо інші дані
      const updatedUser = await updateUser({ name, description });
      setUser(updatedUser);
      onClose();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Помилка при оновленні профілю",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Редагувати профіль</h2>
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.avatarSection}>
            <div className={css.avatarPreviewWrapper}>
              {avatarPreview && (
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  width={120}
                  height={120}
                  className={css.avatarPreview}
                />
              )}
            </div>
            <label htmlFor="avatar" className={css.avatarLabel}>
              Змінити аватар
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className={css.avatarInput}
              />
            </label>
            <p className={css.avatarHint}>Макс. 500KB, JPG/PNG</p>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>
              Ім&apos;я
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={css.input}
              placeholder="Введіть ваше ім'я"
              maxLength={32}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="description" className={css.label}>
              Опис
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={css.textarea}
              placeholder="Розкажіть про себе"
              maxLength={150}
              rows={4}
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={css.cancelButton}
              disabled={isLoading}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
