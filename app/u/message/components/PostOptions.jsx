"use client";

import React, { useState } from "react";
import { Flag, HeartCrack, UserX, Trash2 } from 'lucide-react';


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

export function PostOptions({ children }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold">
        <HeartCrack size={20} /> Not Intrested
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold"><UserX size={20} />UnFollow</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold "> <Flag size={20} /> Report</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold"> <Trash2 size={20} />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
