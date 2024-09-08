// Import necessary components and icons
"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SendHorizontal, MoveLeft } from "lucide-react";
import { ImagePlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useChat } from "@/contexts/chatContext";
import { Button } from "@/components/ui/button";
import { UseUserStream } from "@/lib/users/firebase_read";

const dummyMessages = [
  {
    text: "Hi, User B! How is it going?",
    sender: "user_a",
    timestamp: new Date(),
  },
  {
    text: "Hey, User A! I am doing great. How about you?",
    sender: "selectedChat",
    timestamp: new Date(),
  },
  // Add more messages as needed
];

export default function Chatbox() {
  const { selectedChat, handleChange } = useChat();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(selectedChat);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom on initial render
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, []);

  return (
    <div className="flex w-full justify-center align-self: flex-end  h-screen">
      <Card className=" flex flex-col pt-4 align-self: flex-end items-start justify-center h-screen w-full rounded-none">
        <CardHeader className=" h-12 flex flex-row justify-center item-start p-1 overflow-wrap">
          <MoveLeft
            size={28}
            strokeWidth={2}
            className="my-1 flex flex-col h-full justify-center items-center cursor-pointer"
            onClick={() => {
              handleChange(null);
            }}
          />
          <Avatar className="my-3 mx-2 cursor-pointer h-full">
            <AvatarImage src={profile?.photoURL} alt="User" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
          <CardTitle className="items-start h-full  justify-center text-2xl  font-bold overflow-wrap break-words">
            {profile?.name}
          </CardTitle>
        </CardHeader>

        {/* scrollable div */}
        <CardContent
          ref={chatContainerRef}z
          className="w-full h-full p-4 text-black-200 bg-white-900 flex flex-col gap-2 mt-4 overflow-y-auto"
        >
          <div className={cn("flex flex-col gap-2")}>
            {dummyMessages?.map((message, index) => {
              const isSentByCurrentUser = message.sender === "user_a";
              return (
                <>
                  {!isSentByCurrentUser ? (
                    <div
                      className={cn(
                        "rounded-lg p-3 text-black-300 flex items-start gap-2"
                      )}
                    >
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="user_a_avatar.jpg" alt="User A" />
                        <AvatarFallback>UA</AvatarFallback>
                      </Avatar>
                      <p className="w-full my-2 overflow-wrap break-words text-m">
                        Hi, User B! How is it going?
                      </p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "rounded-lg p-3 text-black-300 flex items-end justify-end  gap-2",
                        {}
                      )}
                    >
                      <p className="w-full my-2 overflow-wrap flex items-start justify-end   text-m ">
                        Hey, User A! I am doing great. How about you? sent by
                        current
                      </p>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="user_b_avatar.jpg" alt="User B" />
                        <AvatarFallback>UB</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-between  bg-white-900">
          <div className="flex-grow inline-flex items-center w-full cursor-pointer">
            <Input
              type="text"
              placeholder="Type your message"
              className="flex-row p-6 mr-8 border shadow-lg rounded-md justify-center bg-black-300 inline-block align-middle"
            />
            <SendHorizontal
              size={32}
              color="#009ED9 "
              className="transition-transform transform hover:scale-110"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
