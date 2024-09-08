"use client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostTrigger from "./CreatePostTrigger";
import InfiniteScrollPost from "./InfiniteScrollPosts";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/contexts/posts/context";

export default function TopTabs() {
  const { allPosts } = usePost();
  return (
    <Tabs defaultValue="explore" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="explore">Explore</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <div className="flex flex-col h-screen pb-20 overflow-y-auto overflow-x-hidden">
          <CreatePostTrigger />
          <Separator className="my-4 " />
          <InfiniteScrollPost />
        </div>
      </TabsContent>
      <TabsContent value="following">
        <div className="flex flex-col h-screen pb-10 overflow-y-auto overflow-x-hidden">
          <CreatePostTrigger />
          <Separator className="my-4 " />
          <InfiniteScrollPost />
        </div>
      </TabsContent>
    </Tabs>
  );
}
