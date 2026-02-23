"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useId } from "react";

export default function Registration() {
  const fieldId = useId();

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  };

  interface FormValues {
    name: string;
    email: string;
    password: string;
  }

  const initialValues: FormValues = {
    name: "Ваше імʼя та прізвище",
    email: "hello@podorozhnyky.ua",
    password: "********",
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
      .min(6, "Password must be at least 2 characters")
      .required("Password is required"),
  });

  return (
    <>
      <main>
        <h1>Реєстрація</h1>
        <p>Раді вас бачити у спільноті мандрівників!</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <fieldset>
              <div>
                <label htmlFor={`${fieldId}-name`}>Імʼя та Прізвище*</label>
                <Field type="text" name="name" id={`${fieldId}-name`} />
              </div>
              <div>
                <label htmlFor={`${fieldId}-email`}>Пошта*</label>
                <Field type="email" name="email" id={`${fieldId}-email`} />
              </div>
              <div>
                <label htmlFor={`${fieldId}-password`}>Пароль*</label>
                <Field
                  type="password"
                  name="password"
                  id={`${fieldId}-password`}
                />
              </div>
            </fieldset>

            <button type="submit">Зареєструватися</button>
          </Form>
        </Formik>
      </main>
    </>
  );
}

// import { notFound } from "next/navigation";
// import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";

// export default function AuthPage({ params }: { params: { authType: string } }) {
//   const { authType } = params;
//   if (authType === "register") {
//     return <RegistrationForm />;
//   }

//   return notFound();
// }
