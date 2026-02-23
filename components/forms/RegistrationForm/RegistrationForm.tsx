"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import styles from "./RegistrationForm.module.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const router = useRouter();

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
      const response = await fetch(
        "https://fullstack-120-project-group-1-backend.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Сталася помилка при реєстрації");
        return;
      }
      router.push("/");
    } catch (error) {
      alert("Сталася помилка при реєстрації");
      console.error(error);
    }
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.scroll}>
          <p className={styles.registrationText}>Реєстраця</p>
          <p className={styles.loginText}>Вхід</p>
        </div>
        <h1 className={styles.title}>Реєстрація</h1>
        <p className={styles.subtitle}>
          Раді вас бачити у спільноті мандрівників!
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <fieldset className={styles.container}>
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
            </fieldset>

            <button type="submit" className={styles.button}>
              Зареєструватися
            </button>
          </Form>
        </Formik>
      </main>
    </>
  );
}
