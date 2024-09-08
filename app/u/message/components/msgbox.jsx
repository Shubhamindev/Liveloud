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

const dataList = [
  { id: 1, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
  { id: 2, title: "@username" },
];

export default function MsgBox() {
  const { selectedChat, handleChange } = useChat();
  return (
    <Card className="flex flex-col align-self: flex-end items-start justify-center h-screen w-full rounded-none">
      <CardHeader className=" h-12 flex flex-row p-1 item-start  overflow-wrap">
        <Avatar className="my-3 mx-2">
          <AvatarImage src="user_a_avatar.jpg" alt="User A" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
        <CardTitle className="items-start text-2xl p-2 font-bold overflow-wrap break-words">
          Username
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full gap-2 h-full p-4 text-black-200 bg-white-200 flex flex-col  mt-4 overflow-y-auto">
        {dataList?.map((item, index) => (
          <card
            onClick={() => {
              handleChange(index+1);
            }}
            key={index}
            className="h-12 w-full flex flex-row items-center justify-between rounded-lg border overlap-wrap "
          >
            <Avatar className="my-3 mx-2">
              <AvatarImage src="user_a_avatar.jpg" alt="User A" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold w-full my-2 overflow-wrap break-words text-m gap-2">
              {item?.title}
            </h3>
          </card>
        ))}
      </CardContent>
      <></>
    </Card>
  );
}
