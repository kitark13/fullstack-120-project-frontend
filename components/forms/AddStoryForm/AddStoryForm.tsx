"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createStory, getCategories, Category } from "@/lib/api/clientApi";
import { Story } from "@/types/index";
import Loading from "@/app/loading";
import s from "./AddStoryForm.module.css";

interface FormValues {
  title: string;
  category: string;
  description: string;
  article: string;
  image: File | null;
  date: string;
}

const MAX_DESC = 61;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Заголовок занадто короткий")
    .max(150, "Максимум 150 символів")
    .required("Обов'язкове поле"),
  category: Yup.string().required("Оберіть категорію"),
  description: Yup.string()
    .max(MAX_DESC, `Максимум ${MAX_DESC} символів`)
    .required("Обов'язкове поле"),
  article: Yup.string()
    .min(20, "Напишіть довший текст")
    .max(10000, "Текст занадто довгий")
    .required("Обов'язкове поле"),
  image: Yup.mixed().required("Додайте фото"),
  date: Yup.string().required(),
});

export default function AddStoryForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (fetchingCategories) {
    return (
      <div className={s.fullPageLoading}>
        <Loading />
      </div>
    );
  }

  const initialValues: FormValues = {
    title: "",
    category: "",
    description: "",
    article: "",
    image: null,
    date: new Date().toISOString(),
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    if (!values.image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("article", values.article);
    formData.append("image", values.image);
    formData.append("date", values.date);

    try {
      const newStory: Story = await createStory(formData);
      router.push(`/stories/${newStory._id}`);
      router.refresh();
    } catch {
      alert("Помилка збереження"); /////////
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
    >
      {({ setFieldValue, setFieldTouched, isValid, dirty, values, errors, touched }) => (
        <Form className={s.addStoryForm}>
          {loading && (
            <div className={s.overlayLoading}>
              <Loading />
            </div>
          )}

          <div className={s.inputsSide}>
            <div className={s.fieldGroup}>
              <p className={s.label}>Обкладинка статті</p>
              <label htmlFor="image-upload" className={s.imageLabel}>
                <div className={`${s.imagePlaceholder} ${errors.image && touched.image ? s.inputError : ""}`}>
                  {preview ? (
                    <Image src={preview} alt="Preview" fill className={s.objectCover} />
                  ) : (
                    <Image src="/images/placeholder-image.jpg" alt="Add" fill className={s.placeholderImage} />
                  )}
                </div>
                <span className={s.uploadBtn}>Завантажити фото</span>
              </label>
              <input
                id="image-upload"
                type="file"
                className={s.hiddenInput}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                    setFieldTouched("image", true);
                    if (preview) URL.revokeObjectURL(preview);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              <ErrorMessage name="image" component="p" className={s.errorText} />
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="title" className={s.label}>Заголовок</label>
              <Field 
                name="title" 
                placeholder="Введіть заголовок історії" 
                className={`${s.input} ${errors.title && touched.title ? s.inputError : ""}`} 
              />
              <ErrorMessage name="title" component="p" className={s.errorText} />
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="category" className={s.label}>Категорія</label>
              <div className={s.selectWrapper}>
                <Field 
                    as="select" 
                    name="category" 
                    className={`${s.select} ${errors.category && touched.category ? s.inputError : ""}`}
                    onFocus={() => setIsSelectOpen(true)}
                    onBlur={() => {
                        setIsSelectOpen(false);
                        setFieldTouched("category", true); // Додано для миттєвої валідації
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
                    <use href={`/sprite-final-opt.svg#${isSelectOpen ? 'iicon-keyboard-arrow-up' : 'icon-keyboard-arrow-down'}`} />
                </svg>
              </div>
              <ErrorMessage name="category" component="p" className={s.errorText} />
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="description" className={s.label}>Короткий опис</label>
              <Field
                as="textarea"
                name="description"
                className={`${s.textarea} ${s.shortDesc} ${errors.description && touched.description ? s.inputError : ""}`}
                placeholder="Коротко про історію..."
                maxLength={MAX_DESC}
              />
              <div className={s.charCounter}>
                Лишилось символів: {MAX_DESC - (values.description?.length || 0)}
              </div>
              <ErrorMessage name="description" component="p" className={s.errorText} />
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="article" className={s.label}>Текст історії</label>
              <Field 
                as="textarea" 
                name="article" 
                className={`${s.textarea} ${errors.article && touched.article ? s.inputError : ""}`} 
                placeholder="Ваша історія тут" 
              />
              <ErrorMessage name="article" component="p" className={s.errorText} />
            </div>
          </div>

          <aside className={s.actionsSide}>
            <button
              type="submit"
              className={s.btnSave}
              disabled={!isValid || loading} 
            >
              {loading ? "Збереження..." : "Зберегти"}
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