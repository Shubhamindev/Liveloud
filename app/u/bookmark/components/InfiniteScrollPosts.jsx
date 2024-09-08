// InfiniteScrollPost.jsx

"use client";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/contexts/posts/context";
import { UsePostsStream } from "@/lib/posts/firebase_read";
import { useAuth } from "@/contexts/auth/context";
import {
  UseUserSavedPostIdsStream,
  UseUserSavedPostsStream,
} from "@/lib/users/firebase_read";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const InfiniteScrollPost = () => {
  const { user } = useAuth();

  const {
    data: savedPostIds,
    isLoading: postIdsLoading,
    error: idsError,
  } = UseUserSavedPostIdsStream(user?.uid);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const [data, setData] = useState(null);

  const [posts, setPosts] = useState(data || []);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  useEffect(() => {
    if (savedPostIds && savedPostIds?.length > 0) {
      const ref = query(
        collection(db, "posts"),
        where(
          "postId",
          "in",
          savedPostIds?.map((post) => post.postId)
        )
      );
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setData(snap.docs.map((snap) => snap.data()));
          setIsLoading(false);
          setIsDone(true);
        },
        (error) => {
          setError(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [savedPostIds]);

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
      loader={<h4>Loading...</h4>}
    >
      {posts
        .sort((a, b) => {
          return b?.createdAt?.seconds - a?.createdAt?.seconds;
        })
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
      <Separator className="mt-4" />
      <div className="flex justify-center">
        <h1>
          {postIdsLoading
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
           