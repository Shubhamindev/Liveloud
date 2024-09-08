import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth/context";
import { UseUserStream } from "@/lib/users/firebase_read";

export function XPCard() {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(user?.uid);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="w-full flex flex-col-reverse sm:flex-row gap-2 justify-between sm:items-center items-start">
            <h1 className="text-xl font-bold text-sky-500">XP WALLET</h1>
            <p className="text-gray-600">
              <img
                src="/pnglogo.png"
                className="w-8 h-8 mr-1 inline-block"
                alt="coin"
              />
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full justify-center items-start flex flex-col ">
          <h1 className="text-xs font-semibold uppercase">balance</h1>
          <p className="text-xl font-black ">{profile?.xp || 0} XP</p>
        </div>
      </CardContent>    
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <Button variant="outline">Top-Up</Button>
        <Button variant="outline">Transfer</Button>
        <Button>Withdraw</Button>
      </CardFooter>
    </Card>
  );
}
