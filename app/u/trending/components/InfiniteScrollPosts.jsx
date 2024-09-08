// InfiniteScrollPost.jsx

"use client";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/contexts/posts/context";
import { UsePostsStream } from "@/lib/posts/firebase_read";

const InfiniteScrollPost = () => {
  const { data, error, isLoading } = UsePostsStream();

  const [posts, setPosts] = useState(data || []);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // Assuming totalElements is the total number of posts
  const totalElements = data?.length; // Adjust this based on your total number of posts

  const fetchMoreData = () => {
    // A fake async API call that sends 20 more records in 1.5 secs
    setTimeout(() => {
      const newPosts =
        posts.length + 20 > totalElements
          ? allPosts.slice(0, totalElements) // Ensure not to exceed the totalElements
          : posts.concat(allPosts.slice(posts.length, posts.length + 20));
      setPosts(newPosts);
    }, 1500);
  };

  return (
    <InfiniteScroll
      className="flex flex-col gap-4 w-full ml-1.5"
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={posts.length < totalElements}
      
    >
      {posts
        .sort((a, b) => {
          const sumA =
            (a?.likes?.length || 0) +
            (a?.comments?.length || 0) +
            (a?.shared?.length || 0) +
            (a?.amplified?.length || 0);
          const sumB =
            (b?.likes?.length || 0) +
            (b?.comments?.length || 0) +
            (b?.shared?.length || 0) +
            (b?.amplified?.length || 0);

          return sumB - sumA;
        })
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
      <Separator className="mt-4" />
      <div className="flex justify-center">
        <h1>
          {isLoading
            ? "Loading..."
            : error
            ? "An Error Occured"
            : "No more posts"}
        </h1>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPost;
