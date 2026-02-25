"use client";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import useAuthStore from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import css from "./LoginForm.module.css";

interface FormValues {
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
      .email("Невірний формат email")
      .required("Email обовʼязковий"),
    password: Yup.string()
      .min(8, "Мінімум 8 символів")
      .required("Пароль обовʼязковий"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const user = await login(values);
      setUser(user);
      toast.success("Ви успішно увійшли!");
      router.push("/");
    } catch (error) {
      toast.error("Невірний email або пароль");
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
          <Form className={css.form}>
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
          </Form>
        </Formik>
      </div>
    </>
  );
}
