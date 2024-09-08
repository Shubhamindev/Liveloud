import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Subscribe() {
  return (
    <div className=" flex items-center space-x-2 w-full">
      <Card className="w-full flex items-center">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Premium</h2>
          <p className="text-gray-700 mb-4">
            Enjoy exclusive features and content with our premium subscription.
          </p>
          <Link href="/u/premium">
          <Button className="text-white bg-[#009ED9] cursor-pointer border hover:text-[#009ED9] hover:bg-white hover:border-[#009ED9]">
            Subscribe
          </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
