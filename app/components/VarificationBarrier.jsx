"use client";
import { useAuth } from "@/contexts/auth/context";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function VarificationBarrier({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (user && !isLoading && !user?.emailVerified) {
    return (
      <div className="flex w-screen h-screen flex-col justify-center flex-wrap p-4 items-center">
        <p>
          We&apos;ve send you an verification Email, click on the provided link
          to verify your account.
          <span
            className="text-blue-500 hover:underline"
            onClick={async () => {
              await user.sendEmailVerification();
            }}
          >
            Send Email Again
          </span>
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg"
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return children;
}
