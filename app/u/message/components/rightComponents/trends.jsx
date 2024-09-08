import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Trends() {
  return (
    <div className=" flex items-center space-x-2 ">
      <Card className="w-full flex items-center">
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-2">What&apos;s Happening</h2>
          <div className="flex flex-row justify-between w-full mb-4">
            <p className="text-gray-700">#India</p>
            <p className="text-gray-700">613K posts</p>
          </div>
          <button className="text-[#009ED9] text-sm font-semibold cursor-pointer flex justify-center">
            Show More
          </button>
        </div>
      </Card>
    </div>
  );
}
