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

export default function Username( {item}) {
  return (
    <Card className="flex flex-col align-self: flex-end items-start justify-center h-screen w-[400px] rounded-none" >
      
       <CardHeader className=" h-12 flex flex-row p-1 item-start  overflow-wrap">
       <Avatar className="my-3 mx-2">
          <AvatarImage src="user_a_avatar.jpg" alt="User A" />
          <AvatarFallback>UA</AvatarFallback>
          </Avatar>
          <CardTitle className="items-start text-2xl p-2 font-bold overflow-wrap break-words">
            Username
          </CardTitle>

       </CardHeader>
       <CardContent className="w-full h-full p-4 text-gray-200 bg-gray-900 flex flex-col  mt-4 overflow-y-auto">

       
       <card className="h-12 w-full flex flex-row items-center justify-between rounded-lg border overlap-wrap ">
       <Avatar className="my-3 mx-2">
          <AvatarImage src="user_a_avatar.jpg" alt="User A" />
          <AvatarFallback>UA</AvatarFallback>
          </Avatar>
       <h3 className="text-xl font-bold w-full my-2 overflow-wrap break-words text-m gap-2">{item?.title}</h3>
       </card>
       </CardContent>
      <>

        
      </>
    </Card>
  );
}
