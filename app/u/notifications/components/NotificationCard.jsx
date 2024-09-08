<<<<<<< HEAD
import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Trash2 } from "lucide-react";

export default function NotificationCard({ item }) {
  return (
    <Card
      key={item.id}
      className="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <>
        <div className="space-y-0.5">
          <Label className="text-base">{item.title}</Label>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Check className="cursor-pointer  text-[#009ED9] hover:text-blue-300" />
          <Trash2 className="cursor-pointer text-red-500 hover:text-red-400" />
        </div>
      </>
    </Card>
=======
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Trash2 } from "lucide-react";
import Link from "next/link";

export default function NotificationCard({ item }) {
  return (
    <Link href={`${window?.location?.host}/${item?.link}`}>
      <Card className="flex flex-row cursor-pointer items-center justify-between rounded-lg border p-4">
        <>
          <div className="space-y-0.5">
            <Label className="text-base">{item?.content || ""}</Label>
          </div>
          {/* <div className="flex gap-2 flex-wrap">
          <Check className="cursor-pointer  text-[#009ED9] hover:text-blue-300" />
          <Trash2 className="cursor-pointer text-red-500 hover:text-red-400" />
        </div> */}
        </>
      </Card>
    </Link>
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2
  );
}
