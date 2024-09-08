"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { SentPaymentRequestForSubscription } from "@/lib/premium/firebase_write";
import { UseUserPostsStream, UseUserStream } from "@/lib/users/firebase_read";

const PremiumContext = createContext();

export default function PremiumProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);

  const { data, isLoading: loading } = UseUserStream(user?.uid);

  console.log("data",data);

  const payToSubscribe = async (xpReq) => {
    setIsLoading(true);

    if (!user) {
      setIsLoading(false);
      setError("You need to login first");
      return;
    }
    if (!selectedPackage) {
      setIsLoading(false);
      setError("Please select a package");
      return;
    }

    if (data?.xp < xpReq) {
      setIsLoading(false);
      alert("You don't have enough XP");
      return;
    }

    const requestSended = await SentPaymentRequestForSubscription(
      user,
      selectedPackage
    );

    console.log(requestSended);

    if (!requestSended) {
      setIsLoading(false);
      setError("Something went wrong");
      return;
    }

    alert("Request sent");
    setIsLoading(false);
    setIsDone(true);
  };

  return (
    <PremiumContext.Provider
      value={{
        error,
        isLoading,
        selectedPackage,
        setSelectedPackage,
        payToSubscribe,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);
