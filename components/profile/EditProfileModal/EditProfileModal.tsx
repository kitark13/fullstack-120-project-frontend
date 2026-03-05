"use client";

import { User } from "@/types/user";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser, updateUserAvatar } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import Image from "next/image";
import css from "./EditProfileModal.module.css";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  // залишаємо проп, але будемо страхуватись стором
  user: User | null | undefined;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user: userProp,
}: EditProfileModalProps) {
  const setUser = useAuthStore((s) => s.setUser);
  const userFromStore = useAuthStore((s) => s.user);

  const router = useRouter();

  // беремо максимально актуального юзера
  const user = useMemo(
    () => userFromStore ?? userProp ?? null,
    [userFromStore, userProp],
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ініціалізація форми при відкритті
  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      name: user?.name ?? "",
      description: user?.description ?? "",
    });
    setAvatarPreview(user?.avatarUrl ?? "");
    setAvatarFile(null);
    setError(null);
  }, [isOpen, user?.name, user?.description, user?.avatarUrl]);

  // esc + блок скролу
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Розмір файлу не повинен перевищувати 5 МБ");
      return;
    }

    setAvatarFile(file);
    setError(null);

    // миттєвий превʼю
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("Не вдалося знайти дані користувача");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // стартуємо з копії актуального юзера (важливо: не мутуємо)
      let nextUser: User = { ...user };

      // 1) аватар
      if (avatarFile) {
        const avatarResponse = await updateUserAvatar(avatarFile);
        // робимо новий обʼєкт
        nextUser = { ...nextUser, ...avatarResponse };

        // якщо бекенд повертає той самий url — можеш увімкнути cache-buster:
        // nextUser.avatarUrl = `${nextUser.avatarUrl}?t=${Date.now()}`;

        // одразу оновлюємо превʼю на те, що прийшло з бекенду
        if (nextUser.avatarUrl) setAvatarPreview(nextUser.avatarUrl);
      }

      // 2) текстові поля
      const trimmedName = formData.name.trim();
      const trimmedDescription = formData.description.trim();

      const nameChanged = trimmedName !== (user.name ?? "");
      const descChanged = trimmedDescription !== (user.description ?? "");

      if (nameChanged || descChanged) {
        const profileUpdate = await updateUser({
          name: trimmedName,
          description: trimmedDescription,
        });
        nextUser = { ...nextUser, ...profileUpdate };
      }

      // 3) оновлюємо стор (це забезпечить актуальні дані для модалки при наступному відкритті)
      setUser(nextUser);
      window.location.reload();
      // router.refresh();
      // router.replace(window.location.href.replace(window.location.origin, ""));
      // 4) синхронізуємо локальний стан форми (щоб не було "пусто" навіть якщо проп user не оновився)
      setFormData({
        name: nextUser.name ?? "",
        description: nextUser.description ?? "",
      });
      setAvatarFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      onClose();
    } catch (err) {
      console.error(err);
      setError("Помилка при оновленні профілю");
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
