import React from "react";
import Link from "next/link";
import moment from "moment";
import InsertLineBreak from "@/app/helpers/LineBreaker";

export default function SingleComment({ comment }) {
  // console.log("comment", comment);
  return (
    <div class="flex items-center justify-start space-x-2 pr-2">
      <div class="flex flex-row gap-1">
        <Link
          href={`
        /u/${comment?.owner?.uid || "#"}`}
        >
          <img
            src={comment?.owner?.photoURL || "/bg.jpg"}
            alt="avatar"
            class="w-8 h-8 rounded-full"
          />
        </Link>
        <div>
          <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
            <div class="font-medium">
              <Link href="#" class="hover:underline text-sm">
                <strong>{comment?.owner?.name || "Unknown"}</strong>
              </Link>
            </div>
            <div class="text-xs text-clip">
              {InsertLineBreak({ inputString: comment?.content })}
            </div>
          </div>
          <div class="flex justify-start items-center text-xs w-full">
            <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
              <h1 class="hover:underline">
                <small>
                  {moment(comment?.createdAt?.seconds * 1000).fromNow()}
                </small>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
