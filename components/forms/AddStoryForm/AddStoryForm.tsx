"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createStory, updateStory, getCategories } from "@/lib/api/clientApi";
import { Category } from "@/types/category";
import { Story } from "@/types";
import Loading from "@/app/loading";
import s from "./AddStoryForm.module.css";

type Mode = "create" | "edit";

interface Props {
  mode?: Mode;
  initialStory?: Story;
}

interface FormValues {
  title: string;
  category: string;
  article: string;
  img: File | null;
}

export default function AddStoryForm({ mode = "create", initialStory }: Props) {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // edit: показати поточну обкладинку
  useEffect(() => {
    if (mode === "edit" && initialStory?.img) {
      setPreview(initialStory.img);
    }
  }, [mode, initialStory]);

  // чистимо тільки blob URL
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const initialValues: FormValues = useMemo(
    () => ({
      title: initialStory?.title ?? "",
      category: initialStory?.category?._id ?? "",
      article: initialStory?.article ?? "",
      img: null,
    }),
    [initialStory],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string()
          .min(5, "Заголовок занадто короткий")
          .max(150, "Максимум 150 символів")
          .required("Обов'язкове поле"),
        category: Yup.string().required("Оберіть категорію"),
        article: Yup.string()
          .min(20, "Напишіть довший текст")
          .max(1000, "Текст занадто довгий")
          .required("Обов'язкове поле"),
        img:
          mode === "create"
            ? Yup.mixed().required("Додайте фото")
            : Yup.mixed().nullable(),
      }),
    [mode],
  );

  if (fetchingCategories) {
    return (
      <div className={s.fullPageLoading}>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("article", values.article);

      // img у edit — тільки якщо користувач вибрав новий файл
      if (values.img) formData.append("image", values.img);

      if (mode === "create") {
        const newStory = await createStory(formData);
        router.push(`/stories/${newStory._id}`);
      } else {
        if (!initialStory?._id) throw new Error("No story id for edit");
        const updated = await updateStory(initialStory._id, formData);
        router.push(`/stories/${updated._id}`);
      }

      router.refresh();
    } catch {
      alert("Помилка збереження");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ setFieldValue, setFieldTouched, isValid, errors, touched }) => (
        <Form className={s.addStoryForm}>
          {loading && (
            <div className={s.overlayLoading}>
              <Loading />
            </div>
          )}

          <div className={s.inputsSide}>
            {/* IMG */}
            <div className={s.fieldGroup}>
              <p className={s.label}>Обкладинка статті</p>

              <label htmlFor="img-upload" className={s.imageLabel}>
                <div
                  className={`${s.imagePlaceholder} ${
                    errors.img && touched.img ? s.inputError : ""
                  }`}
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      sizes="100vw"
                      className={s.objectCover}
                    />
                  ) : (
                    <Image
                      src="/images/placeholder-image.jpg"
                      alt="Placeholder"
                      fill
                      sizes="100vw"
                      className={s.placeholderImage}
                    />
                  )}
                </div>

                <span className={s.uploadBtn}>
                  {mode === "edit" ? "Змінити фото" : "Завантажити фото"}
                </span>
              </label>

              <input
                id="img-upload"
                type="file"
                className={s.hiddenInput}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setFieldValue("img", file);
                  setFieldTouched("img", true);

                  if (preview?.startsWith("blob:"))
                    URL.revokeObjectURL(preview);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              <ErrorMessage name="img" component="p" className={s.errorText} />

              {mode === "edit" && (
                <p className={s.hintText}>
                  Можна не змінювати фото — залишиться поточне.
                </p>
              )}
            </div>

            {/* TITLE */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Заголовок</label>
              <Field
                name="title"
                placeholder="Введіть заголовок історії"
                className={`${s.input} ${
                  errors.title && touched.title ? s.inputError : ""
                }`}
              />
              <ErrorMessage
                name="title"
                component="p"
                className={s.errorText}
              />
            </div>

            {/* CATEGORY */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Категорія</label>

              <div className={s.selectWrapper}>
                <Field
                  as="select"
                  name="category"
                  className={`${s.select} ${
                    errors.category && touched.category ? s.inputError : ""
                  }`}
                  onFocus={() => setIsSelectOpen(true)}
                  onBlur={() => {
                    setIsSelectOpen(false);
                    setFieldTouched("category", true);
                  }}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue("category", e.target.value);
                    setIsSelectOpen(false);
                  }}
                >
                  <option value="">Оберіть категорію</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>

                <svg className={s.selectIcon}>
                  <use
                    href={`/sprite-final-opt.svg#${
                      isSelectOpen
                        ? "iicon-keyboard-arrow-up"
                        : "icon-keyboard-arrow-down"
                    }`}
                  />
                </svg>
              </div>

              <ErrorMessage
                name="category"
                component="p"
                className={s.errorText}
              />
            </div>

            {/* ARTICLE */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Текст історії</label>
              <Field
                as="textarea"
                name="article"
                className={`${s.textarea} ${
                  errors.article && touched.article ? s.inputError : ""
                }`}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage
                name="article"
                component="p"
                className={s.errorText}
              />
            </div>
          </div>

          <aside className={s.actionsSide}>
            <button
              type="submit"
              className={s.btnSave}
              disabled={!isValid || loading}
            >
              {loading
                ? "Збереження..."
                : mode === "edit"
                  ? "Зберегти зміни"
                  : "Зберегти"}
            </button>

            <button
              type="button"
              className={s.btnCancel}
              onClick={() => router.back()}
              disabled={loading}
            >
              Відмінити
            </button>
          </aside>
        </Form>
      )}
    </Formik>
  );
}
