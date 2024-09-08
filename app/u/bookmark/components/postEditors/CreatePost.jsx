"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { MediaCarousel } from "./MediaCarousel";
import { Smile, ImagePlus } from "lucide-react";
import { useNewPost } from "@/contexts/newPost/context";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "@/contexts/themeContext";
import GifPicker from "gif-picker-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function CreatePostDiolog({ children }) {
  const { theme } = useTheme();
  const {
    isLoading,
    handleChange,
    isDone,
    postData,
    createNewPost,
    handleMediaChange,
  } = useNewPost();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-screen overflow-auto p-2">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Speak Loud Your Message to the Globe: Amplify Your Voice!
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col justify-center items-center">
          <Textarea
            onChange={(e) => handleChange("content", e.target.value)}
            value={postData?.content}
            name="content"
            placeholder="Whats Happening?!"
            className="resize-none text-2xl mt-3 pb-3 w-full h-fit max-h-56  outline-none border-none  py-2"
          />

          <div className="w-full gap-2 text-sm text-gray-500 flex justify-between items-center">
            <select
              onChange={(e) => handleChange("visibility", e.target.value)}
              className="
              w-1/3
              p-2
              rounded-lg
              border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150
              ease-in-out
              
            "
              value={postData?.visibility}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="followers">My Followers Only</option>
            </select>
            <Input
              className="h-10"
              placeholder="#HASHTAG"
              onChange={(e) => handleChange("tags", e.target.value)}
              value={postData?.tags}
            />
            {postData?.content?.length || 0} / 600
          </div>
          {postData?.media?.length > 0 && (
            <MediaCarousel postMedia={postData?.media} />
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <div className="flex justify-start gap-4">
            <label className="flex m-2">
              <input
                onChange={(e) => handleMediaChange(e)}
                className="hidden"
                type="file"
              />
              <ImagePlus className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label>
            {/* emoji icon */}
            <label className="flex m-2">
              <Dialog>
                <DialogTrigger>
                  <Smile className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="w-fit py-8 max-h-screen overflow-auto">
                  <Picker
                    data={data}
                    theme={theme}
                    onEmojiSelect={(e) => {
                      handleChange("content", postData?.content + e.native);
                      document.getElementById("closeBtnImogi").click();
                    }}
                  />
                  <DialogClose>
                    <button id="closeBtnImogi" className="hidden"></button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </label>
            {/* gif icon */}
            <label className="flex m-2">
              <Dialog>
                <DialogTrigger>
                  <img
                    src="/gif2.svg"
                    alt="GIF"
                    width={24}
                    height={24}
                    className="cursor-pointer item-center"
                  />
                </DialogTrigger>
                <DialogContent className="w-fit py-8">
                  <GifPicker
                    onGifClick={(e) => {
                      // console.log(e);
                      handleMediaChange(e);
                      document.getElementById("closeBtnGif").click();
                    }}
                    tenorApiKey={"AIzaSyA6u39Z0ZKdnqk1SXfbrxm066ICUjQ4eKI"}
                  />
                </DialogContent>
                <DialogClose>
                  <button id="closeBtnGif" className="hidden"></button>
                </DialogClose>
              </Dialog>
            </label>
            {/* poll icon */}
            {/* <label className="flex m-2">
      <input className="hidden" type="file" />
      <BarChartBig className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
    </label> */}
          </div>

          <Button
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              // console.log(postData);
              createNewPost();
              document.getElementById("closeBtn").click();
            }}
            className="p-2.5 rounded-xl shadow-md bg-[#009ED9] text-white border border-white hover:text-[#009ED9] hover:bg-white hover:border-[#009ED9] hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Post"}
          </Button>
        </DialogFooter>
        <DialogClose asChild>
          <button id="closeBtn" className="hidden"></button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
