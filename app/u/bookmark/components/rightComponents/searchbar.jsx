"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UseAllProfilesStream } from "@/lib/profiles/firebase_read";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CardWithSearchBar() {
  const { data, error, isLoading } = UseAllProfilesStream();
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Show the list only if there's a search value
    setShowList(value.trim() !== "");
  };

  const filteredProfiles = data
    ? data.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          profile.handle.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="flex max-h-56 h-auto flex-col items-center space-x-2">
      <Card className="w-full relative flex-col p-2 flex items-center space-x-2">
        <Input
          type="text"
          className="px-3 py-2 w-full"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
        />

        {showList && (
          <div className="flex absolute mt-10 bg-white border rounded-lg p-4 shadow-lg w-full flex-col pb-10 h-56 overflow-y-scroll overflow-x-hidden">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <React.Fragment key={profile?.uid}>
                  <Link
                    href={`/u/${profile?.uid}`}
                    className="flex w-full flex-col p-2 cursor-pointer hover:bg-gray-200 items-center justify-center"
                  >
                    <div className="flex gap-2 w-full items-center">
                      <img
                        src={
                          profile?.photoURL ||
                          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        className="rounded-full h-8 w-8"
                        alt={`${profile?.name}'s profile`}
                      />
                      <h1 className="text-xl flex flex-row gap-1 items-center font-black">
                        {profile?.name}{" "}
                        <span className="text-sm text-gray-400">
                          @{profile?.handle}
                        </span>
                      </h1>
                    </div>
                  </Link>
                  <Separator />
                </React.Fragment>
              ))
            ) : (
              <div className="text-gray-600 text-center">No profiles found</div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
