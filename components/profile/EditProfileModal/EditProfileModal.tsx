"use client";

import { User } from "@/types/user";
import { useState, useEffect, useRef } from "react";
import { updateUser, updateUserAvatar } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import Image from "next/image";
import css from "./EditProfileModal.module.css";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null | undefined;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || "",
        description: user.description || "",
      });
      setAvatarPreview(user.avatarUrl || "");
      setAvatarFile(null);
      setError(null);
    }
  }, [isOpen, user]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Розмір файлу не повинен перевищувати 5 МБ");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let updatedUser = user;
      let avatarUrl = user?.avatarUrl;

      // Оновлюємо аватар якщо вибрано новий файл
      if (avatarFile) {
        const avatarResponse = await updateUserAvatar(avatarFile);
        updatedUser = avatarResponse;
        avatarUrl = avatarResponse.avatarUrl;
      }

      // Оновлюємо профіль якщо змінилися дані
      if (
        formData.name !== user?.name ||
        formData.description !== user?.description
      ) {
        const profileUpdate = await updateUser({
          name: formData.name,
          description: formData.description,
        });
        updatedUser = profileUpdate;
        // Зберігаємо avatarUrl якщо він був оновлений раніше
        if (avatarUrl) {
          updatedUser.avatarUrl = avatarUrl;
        }
      }

      // Оновлюємо стор з новими даними
      if (updatedUser) {
        setUser(updatedUser);
      }

      onClose();
    } catch (err) {
      setError("Помилка при оновленні профілю");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Редагувати профіль</h2>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.avatarSection}>
            <div className={css.avatarPreviewWrapper}>
              <Image
                src={
                  avatarPreview ||
                  "https://ac.goit.global/fullstack/react/default-avatar.jpg"
                }
                alt="Avatar preview"
                width={120}
                height={120}
                className={css.avatarPreview}
              />
            </div>
            <label htmlFor="avatar-upload" className={css.avatarLabel}>
              Змінити фото
            </label>
            <input
              ref={fileInputRef}
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={css.avatarInput}
            />
            <p className={css.avatarHint}>Максимальний розмір: 5 МБ</p>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>
              Ім&apos;я
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={css.input}
              placeholder="Введіть ваше ім'я"
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="description" className={css.label}>
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={css.textarea}
              placeholder="Розповідьте про себе"
              rows={4}
            />
          </div>

          {error && <div className={css.error}>{error}</div>}

          <div className={css.actions}>
            <button
              type="button"
              className={css.btnCancel}
              onClick={onClose}
              disabled={loading}
            >
              Скасувати
            </button>
            <button type="submit" className={css.btnSubmit} disabled={loading}>
              {loading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
