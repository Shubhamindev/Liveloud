import { CopyIcon } from "@radix-ui/react-icons";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SingleComment from "./SingleComment";
import { usePost } from "@/contexts/posts/context";
import { UsePostByIdtStream } from "@/lib/posts/firebase_read";
import { useState } from "react";

export function CommentDiologBox({ children, postId }) {
  const { newComment, handleCommentChange, handleCommentSubmit } = usePost();

  const { data, error, isLoading } = UsePostByIdtStream(postId);

  const [comment, setComment] = useState("");





  // console.log("postiD", postId);
  return (
    <Dialog className="max-h-screen h-fit">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div class="w-full max-w-md rounded-md bg-white p-[2px]">
          <div class="mb-4">
            <div class="bg-white p-2">
              <p class="font-semibold text-gray-600">Comments on the Post:</p>
            </div>
            <div class="top-0 mt-2 max-h-52 space-y-2 overflow-y-auto border-t pt-2">
              {data?.comments
                ?.sort((a, b) => {
                  return b?.createdAt?.seconds - a?.createdAt?.seconds;
                })
                .map((item, index) => (
                  <SingleComment key={index} comment={item} />
                ))}
              {/* <SingleComment comment={item} /> */}
            </div>
          </div>
        </div>

        <DialogFooter className="justify-cewnter">
          <div class="flex flex-col mb-4 w-full">
            <label
              for="comment"
              class="block text-sm font-medium text-gray-600"
            >
              Your Comment:
            </label>
            <div
              // onSubmit={(e) => handleCommentSubmit(e, postId)}
              className="flex gap-2"
            >
              <Input
                type="text"
                value={comment}
                onChange={(e) => {
                  handleCommentChange(e);
                  setComment(e.target.value);
                }}
                className="flex-1"
              />
              <Button
                onClick={(e) => {
                  handleCommentSubmit(e, postId);
                  setComment("");
                }}
              >
                Comment
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
