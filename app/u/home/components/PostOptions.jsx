"use client";

import React, { useState } from "react";
import { Flag, HeartCrack, UserX, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePost } from "@/contexts/posts/context";
import { useAuth } from "@/contexts/auth/context";
import { ReportDiologBox } from "./ReportDiolog";

export function PostOptions({ children, postId, ownerId }) {
  const { handleDeletePost } = usePost();
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <ReportDiologBox post={postId}>
          <div className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1 font-bold">
            <Flag size={20} /> Report
          </div>
        </ReportDiologBox>
        {/* <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold "> <Flag size={20} /> Report</DropdownMenuItem> */}
        {ownerId == user?.uid && (
          <DropdownMenuItem
            onClick={() => handleDeletePost(postId)}
            className="cursor-pointer gap-2 hover:font-bold"
          >
            {" "}
            <Trash2 size={20} />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
