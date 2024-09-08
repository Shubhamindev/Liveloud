import Initials from "@/app/helpers/NameToAvtaar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/contexts/chatContext";
import { UseUserStream } from "@/lib/users/firebase_read";
import React from "react";

export default function UserCard({ userId }) {
  const { selectedChat, handleChange } = useChat();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(userId);

  return (
    <card
      onClick={() => {
        handleChange(userId);
      }}
      className="h-12 cursor-pointer hover:bg-gray-100 w-full flex flex-row items-center justify-between rounded-lg border overlap-wrap "
    >
      <Avatar className="my-3 mx-2">
        <AvatarImage src={profile?.photoURL} alt="User A" />
        <AvatarFallback>{Initials(profile?.name)}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold w-full my-2 overflow-wrap break-words text-m gap-2">
        {profile?.name}
      </h3>
    </card>
  );
}
