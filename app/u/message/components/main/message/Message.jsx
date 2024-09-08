"use client";
import React from "react";
import Inbox from "./components/Inbox";
import Msgbox from "./components/msgbox";
import Username from "./components/username";
import { useChat } from "@/contexts/chatContext";

export default function Message() {
  const { selectedChat } = useChat();
  return (
    <div className="flex w-full rounded-2xl border  justify-center h-[98%] overflow-hidden">
      <div className="flex items-center w-full overflow-hidden h-full justify-between">
        {!selectedChat && (
          <div className="w-full py-5">
            {" "}
            <Msgbox />
          </div>
        )}
        {selectedChat && (
          <div className="w-full py-5">
            {" "}
            <Inbox />
          </div>
        )}
      </div>
    </div>
  );
}
