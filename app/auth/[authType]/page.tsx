"use client";

import { useParams } from "next/navigation";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/forms/LoginForm/LoginForm";

export default function AuthPage() {
  const params = useParams();
  const authType = params.authType; // "register" або "login"

  // Вибір компонента в залежності від шляху
  if (authType === "register") {
    return <RegistrationForm />;
  } else if (authType === "login") {
    return <LoginForm />;
  } else {
    return <div>Сторінка не знайдена</div>;
  }
}
