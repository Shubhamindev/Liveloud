"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseAllProfilesStream } from "@/lib/profiles/firebase_read";
import { useAuth } from "@/contexts/auth/context";

export default function RecommendedProfiles() {
  const { data, error, isLoading } = UseAllProfilesStream();
  

  const { user } = useAuth();
  return (
    <Card className="h-full flex  flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">Who To Follow</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div class="items-center justify-center  gap-2 flex flex-col">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">An error has occurred</p>}
          {data &&
            data.slice(0, 5).map((profile, index) => (
              // <div key={index} class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

              <Link
                key={index}
                href="#"
                class="w-full sm:w-full lg:flex-none flex-wrap justify-between bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center  px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <div className="flex-1 gap-1 flex items-center ">
                  <div class=" w-10 h-10">
                    <img
                      src={
                        profile?.photoURL ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                      className=" w-10 h-10 rounded-full object-cover"
                      alt="avatar"
                    />
                  </div>

                  <div class="text-left ">
                    <div class=" font-sans text-sm font-semibold">
                      {profile?.name}
                    </div>
                    <div class="mb-1 text-xs">
                      <span class="text-gray-500">
                        @{profile?.handle?.slice(0, 10)}
                        {profile?.handle?.length > 10 && "..."}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-1 sm:flex-[0.3] w-full sm:mt-0 mt-1 sm:w-fit items-center justify-center">
                  {/* <Plus className="text-xl cursor-pointer " /> */}
                  
                </div>
              </Link>

              // </div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="text-[#009ED9] text-sm font-semibold cursor-pointer mt-auto mb-0">
        <p>Show More</p>
      </CardFooter>
    </Card>
  );
}
