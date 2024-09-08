import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Add() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advertisement</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          width={360}
          height={240}
          src="/bg.jpg"
          alt="Image"
        />
      </CardContent>
      <CardContent>
        <p>Ad Campaign</p>
      </CardContent>
    </Card>
  );
}
