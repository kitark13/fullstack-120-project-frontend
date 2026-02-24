"use client";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import useAuthStore from "@/lib/store/authStore";
import css from "./LoginForm.module.css";

interface FormValues {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
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
        "https://fullstack-120-project-group-1-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Сталася помилка при вході");
        return;
      }

      const data = await response.json();

      // Зберегти токен
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Зберегти юзера в store
      if (data.user) {
        setUser(data.user);
      }

      toast.success("Ви успішно залогіні!");
      // Редірект на головну
      router.push("/");
    } catch (error) {
      toast.error("Сталася помилка при вході");
      console.error(error);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.authToggle}>
          <Link href="/auth/register" className={css.registrationText}>
            Реєстрація
          </Link>
          <p className={css.loginText}>Вхід</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: formikSubmit }) => (
            <form className={css.form} onSubmit={formikSubmit}>
              <h1 className={css.title}>Вхід</h1>
              <p className={css.subtitle}>
                Вітаємо знову у спільноті мандрівників!
              </p>

              <fieldset className={css.formContainer}>
                <div className={css.formField}>
                  <label htmlFor="email" className={css.label}>
                    Пошта*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="hello@podorozhnyky.ua"
                    id="email"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.formField}>
                  <label htmlFor="password" className={css.label}>
                    Пароль*
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="********"
                    id="password"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.error}
                  />
                </div>
              </fieldset>

              <button type="submit" className={css.button}>
                Увійти
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
