"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore, { AuthState } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((s: AuthState) => s.setUser);
  const clearIsAuthenticated = useAuthStore(
    (s: AuthState) => s.clearIsAuthenticated,
  );
  const logout = useAuthStore((s: AuthState) => s.logout);
  const [checking, setChecking] = useState(true);

  const isPrivateRoute = (p: string) =>
    p.startsWith("/profile") ||
    p.startsWith("/stories/create") ||
    (p.startsWith("/stories/") && p.includes("/edit"));

  const isAuthRoute = (p: string) =>
    p.startsWith("/auth/login") ||
    p.startsWith("/auth/register") ||
    p.startsWith("/auth/");

  useEffect(() => {
    let mounted = true;

    async function verify() {
      setChecking(true);
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Спробувати отримати юзера з сесії
          const user = await checkSession();
          if (!mounted) return;

          if (user) {
            setUser(user);
            // Якщо авторизований і на auth-сторінці — редірект на /
            if (pathname && isAuthRoute(pathname)) {
              router.replace("/");
            }
          } else {
            // Токен вимер або невалідний
            clearIsAuthenticated();
            localStorage.removeItem("token");
            if (pathname && isPrivateRoute(pathname)) {
              router.replace("/auth/login");
            }
          }
        } else {
          // Нема токена — не авторизований
          clearIsAuthenticated();
          if (pathname && isPrivateRoute(pathname)) {
            router.replace("/auth/login");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearIsAuthenticated();
        localStorage.removeItem("token");
        if (pathname && isPrivateRoute(pathname)) {
          router.replace("/auth/login");
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Завантаження...</span>
      </div>
    );
  }

  return <>{children}</>;
}
