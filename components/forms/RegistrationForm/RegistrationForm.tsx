"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
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
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
      <main className={styles.container}>
        <ul className={styles.scroll}>
          <li className={styles.registrationItem}>
            <p className={styles.registrationText}>Реєстраця</p>
          </li>
          <li>
            <p className={styles.loginText}>Вхід</p>
          </li>
        </ul>
        <h1 className={styles.title}>Реєстрація</h1>
        <p className={styles.subtitle}>
          Раді вас бачити у спільноті мандрівників!
        </p>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
                <ErrorMessage name="name" component="div" className="error" />
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
                <ErrorMessage name="email" component="div" className="error" />
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
                  className="error"
                />
              </div>
              <button type="submit" className={styles.button}>
                Зареєструватися
              </button>
            </fieldset>
          </Form>
        </Formik>
      </main>
    </>
  );
}
