"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/contexts/chatContext";
import { useAuth } from "@/contexts/auth/context";
import UserCard from "./Card";
import { UseUserStream } from "@/lib/users/firebase_read";
import { UseUserFriendsStream } from "@/lib/message/firebase_read";

const dataList = [
  { id: 1, title: "@start" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 1, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 1, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 1, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@end" },
];

export default function MsgBox() {
  const { selectedChat, handleChange } = useChat();

  const { user } = useAuth();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(user?.uid);

  const { friends, error, isLoading } = UseUserFriendsStream(user);

  return (
    <Card className="flex flex-col align-self: flex-end items-start justify-center h-screen w-full rounded-none">
      <CardHeader className=" h-12 flex flex-row p-1 item-start  overflow-wrap">
        {/* <Avatar className="my-3 mx-2">
          <AvatarImage src="user_a_avatar.jpg" alt="User A" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar> */}
        <CardTitle className="items-start text-2xl p-2 pt-4 font-bold overflow-wrap break-words">
          Your Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full gap-2 h-full p-4 pb-5 text-black-200 bg-white-200 flex flex-col  mt-4 overflow-y-auto">
        {friends?.map((item, index) => (
          <UserCard key={index} userId={item} />
        ))}
      </CardContent>
      <></>
    </Card>
  );
}
