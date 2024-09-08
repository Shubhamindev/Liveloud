"use client";
import { useTheme } from "@/contexts/themeContext";
import Image from "next/image";
import { useContext } from "react";
import AuthenticationPage from "./components/AuthPage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/context";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (user) {
    router.replace(`/u/home`);
  }

  if (!isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-900 flex justify-center">
        <AuthenticationPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-900 flex justify-center">
      Loading...
    </div>
  );
}
