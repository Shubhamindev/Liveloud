"use client";
import React from "react";
import { ImagePlus } from "lucide-react";
import { Smile } from "lucide-react";
import { BarChartBig } from "lucide-react";
import { GalleryThumbnails } from "lucide-react";
import { useAuth } from "@/contexts/auth/context";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostDiolog } from "./postEditors/CreatePost";

export default function CreatePostTrigger() {
  const { user, isLoading } = useAuth();
  return (
    // <div className="flex justify-center w-full">
    <div className="border border-gray-300 bg-white shadow-sm rounded-lg ml-4 mr-2">
      <div className="flex items-start gap-2 px-2">
        <div className="mt-3 w-12 h-full flex flex-col items-start text-lg flex-none">
          <img
            src={user?.photoURL}
            className="flex-none w-12 h-12 rounded-full object-cover"
            alt="avatar"
          />
        </div>

        <CreatePostDiolog>
          <Textarea
            placeholder="What's happening?"
            className="resize-none mt-3 pb-3 hover:cursor-pointer hover:opacity-90 w-full h-28 bg-slate-100 focus:outline-none rounded-xl p-2"
          ></Textarea>
        </CreatePostDiolog>
      </div>
      {/* image icon */}
      <div className="w-full px-4 ml-12">
        <div className="flex flex-row item-center justify-start flex-wrap gap-4">
          <CreatePostDiolog>
            <label className="flex m-2">
              <ImagePlus className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label>
          </CreatePostDiolog>
          {/* emoji icon */}
          <CreatePostDiolog>
            <label className="flex m-2">
              <Smile className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label>
          </CreatePostDiolog>
          {/* gif icon */}
          <CreatePostDiolog>
            <label className="flex m-2">
            <img
                src="/gif2.svg"  
                alt="GIF"
                width={24}
                height={24}
                className="cursor-pointer item-center  "/>
            </label>
          </CreatePostDiolog>
          {/* poll icon */}
          {/* <CreatePostDiolog> */}
          {/* <label className="flex m-2">
              <BarChartBig className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label>
          </CreatePostDiolog> */}
          {/* <button className="p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed">
              Post
            </button> */}
        </div>
      </div>
    </div>
    // </div>
  );
}
