"use client";
import { usePremium } from "@/contexts/premium/context";
import React from "react";
import { XPCard } from "./XPCard";
import { CryptoWallet } from "./CryptoWallet";
import { Separator } from "@/components/ui/separator";

export default function Main() {
  const { selectedPackage, setSelectedPackage } = usePremium();
  console.log(selectedPackage);
  return (
    <div class="w-full text-center rounded-md  p-8 shadow-xs">
      <div className="w-full flex flex-col gap-2 h-auto px-4 sm:flex-row">
        <div className="flex-1 w-full h-32 rounded-lg   ">
          <XPCard />
        </div>
        <div className="flex-1 w-full  rounded-lg ">
          <CryptoWallet />
        </div>
      </div>
      <Separator/>
    </div>
  );
}
