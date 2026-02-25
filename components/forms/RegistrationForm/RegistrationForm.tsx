"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { register } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Імʼя має містити щонайменше 2 символи")
      .max(30, "Імʼя не може бути довшим за 30 символів")
      .required("Імʼя є обовʼязковим полем"),
    email: Yup.string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта є обовʼязковою"),
    password: Yup.string()
      .min(8, "Пароль має містити щонайменше 8 символів")
      .required("Пароль є обовʼязковим"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const user = await register(values);
      setUser(user);
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage("Помилка реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.scroll}>
          <li className={styles.registrationText}>Реєстрація</li>
          <li className={styles.loginText}>
            <Link href="/auth/login">Вхід</Link>
          </li>
        </ul>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <div>
              <h1 className={styles.title}>Реєстрація</h1>
              <p className={styles.subtitle}>
                Раді вас бачити у спільноті мандрівників!
              </p>
            </div>
            <fieldset className={styles.formContainer}>
              <div className={styles.informGroup}>
                <label htmlFor="name" className={styles.label}>
                  Імʼя та Прізвище*
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ваше імʼя та прізвище"
                  id="name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.informGroup}>
                <label htmlFor="email" className={styles.label}>
                  Пошта*
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="hello@podorozhnyky.ua"
                  id="email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.informGroup}>
                <label htmlFor="password" className={styles.label}>
                  Пароль*
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  id="password"
                  className={styles.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button type="submit" className={styles.button}>
                Зареєструватися
              </button>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </>
  );
}
