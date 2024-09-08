import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, MoreVertical } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/auth/context";

export default function ProfilePopOver() {
  const { logout } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical
          className="hover:cursor-pointer dark:text-white"
          size={20}
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <div
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
          className="flex items-center gap-2 rounded-sm border-0 hover:border-0 w-full px-4 bg-red-400 hover:bg-red-300 hover:cursor-pointer transition-all ease-in duration-300 py-2"
          variant="destructive"
        >
          <LogOut /> Log Out
        </div>
      </PopoverContent>
    </Popover>
  );
}
