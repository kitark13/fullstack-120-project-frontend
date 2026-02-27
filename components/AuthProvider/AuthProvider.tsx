"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";
import GlobalLoader from "../common/GlobalLoader/GlobalLoader";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  // const logout = useAuthStore((state) => state.logout);
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
        const user = await checkSession();
        if (!mounted) return;

        if (user) {
          setUser(user);

          if (pathname && isAuthRoute(pathname)) {
            router.replace("/");
          }
        } else {
          clearIsAuthenticated();

          if (pathname && isPrivateRoute(pathname)) {
            router.replace("/auth/login");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearIsAuthenticated();

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
    return <GlobalLoader />;
  }

  return <>{children}</>;
}
