"use client";

import { api } from "@/lib/api/api";
import useAuthStore from "@/lib/store/authStore";

export default function IstoriiAndRegister() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleRegister = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // ✅ тепер тип User співпадає з бекендом
      setUser(res.data);
      console.log(res.data);
      console.log(setUser(res.data));
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const handleClick = async () => {
    try {
      const res = await api.get("/stories");
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

      <div>
        {isAuthenticated ? (
          <p>Привіт, {user?.name}</p>
        ) : (
          <p>Ви не авторизовані</p>
        )}
      </div>

      <button onClick={handleClick}>Отримати історії</button>
    </div>
  );
}
