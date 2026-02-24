"use client";

import { api } from "@/lib/api/api";

export default function IstoriiAndRegister() {
  const handleRegister = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await api.post("/auth/register", {
      name,
      email,
      password,
    });

    alert("Користувача створено. Перевір cookies в DevTools.");
  };

  const handleClick = async () => {
    try {
      const res = await api.get("/stories"); // <-- твій endpoint
      console.log("Stories:", res.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>

      <form action={handleRegister}>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>

      <hr />

      <button onClick={handleClick}>Отримати історії</button>
    </div>
  );
}
