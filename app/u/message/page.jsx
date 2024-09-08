"use client";
import React from "react";
import Inbox from "./components/Inbox";
import Msgbox from "./components/msgbox";
import Username from "./components/username";
import { useChat } from "@/contexts/chatContext";

export default function Page() {
  const { selectedChat } = useChat();
  return (
    <div className="flex pl-20 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex items-center w-full overflow-hidden h-full justify-between">
        {!selectedChat && (
          <div className="w-full">
            {" "}
            <Msgbox />
          </div>
        )}
        {selectedChat && (
          <div className="w-full ">
            {" "}
            <Inbox />
          </div>
        )}
      </div>
    </div>
  );
}
