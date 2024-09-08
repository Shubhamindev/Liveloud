"use client";
import { useAuth } from "@/contexts/auth/context";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { referId } = useParams();
  const router = useRouter();

  const { user } = useAuth();

  if (user) {
    router.replace("/u/home");
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    if (!referId) {
      alert("Invalid referal link");
      router.push("/");
    }

    return () => {
      localStorage.setItem("referId", referId);
      router.replace("/");
    };
  }, [referId, router, localStorage]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      Redirecting...
    </div>
  );
}
