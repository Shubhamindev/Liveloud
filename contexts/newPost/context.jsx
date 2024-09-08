"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../auth/context";
import {
  CreateNewPost,
  uploadFilesToStorage,
} from "@/lib/posts/firebase_write";

const NewPostContext = createContext();

export default function NewPostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const [popUpState, setPopUpState] = useState(false);

  const [postData, setPostData] = useState({
    content: "",
    media: [],
  });

  const handleChange = (key, value) => {
    if (key === "content") {
      if (value.length > 600) {
        return;
      }
    }
    setPostData({
      ...postData,
      [key]: value,
    });
  };

  `
  posts/{postId}:{
    postId: "postId",
    content: "content",
    media:[{
      type: "image",
      url: "url",
    }]
    owner: uid,
    likes: [uid],
    comments: [uid],
    amplified: [uid],
    shared: [uid],
    visibility: "public",
    flag: "flag",
    createdAt: timestamp,
  }
  `;

  const handleMediaChange = (event) => {
    var selectedMedia = null;

    if (event?.tenorUrl) {
      selectedMedia = {
        file: event,
        type: "gif",
        name:"gif"
      };

      setPostData((prevState) => ({
        ...prevState,
        media: [...(prevState?.media || []), selectedMedia],
      }));
    } else {
      selectedMedia = event.target.files[0];

      // console.log(selectedMedia);

      if (!selectedMedia) return;
      if (
        selectedMedia.type.startsWith("image/") &&
        selectedMedia.size > 5000000
      ) {
        alert("File size should be less than 5 MB");
        return;
      }
      if (
        selectedMedia.type.startsWith("video/") &&
        selectedMedia.size > 10000000
      ) {
        alert("Video size should be less than 10 MB");
        return;
      }

      // if (
      // !selectedMedia.type.startsWith("video/") &&
      // !selectedMedia.type.startsWith("image/") && 
      // ) {
      //   alert("File type not supported");
      //   return;
      // }

      console.log(selectedMedia);

      if (selectedMedia) {
        const mediaType = selectedMedia.type.startsWith("image/")
          ? "image"
          : selectedMedia.type.startsWith("video/") ? "video" : "doc";
        const mediaItem = {
          file: selectedMedia,
          type: mediaType,
          name: selectedMedia?.name || "Attached File"
        };

        // console.log("fffff",mediaItem);

        setPostData((prevState) => ({
          ...prevState,
          media: [...(prevState?.media || []), mediaItem],
        }));
      }
    }
  };

  const handleDeSelectMedia = (index) => {
    setPostData((prevState) => ({
      ...prevState,
      media: prevState?.media?.filter((_, i) => i !== index),
    }));
  };

  const createNewPost = async () => {
    setIsLoading(true);
    setIsDone(false);
    if (postData?.content === "" || postData?.content === null || !postData) {
      alert("Content is required");
      setIsLoading(false);
      return;
    }
    try {
      await CreateNewPost({ user, post: postData });
      setPostData({ content: "" });
      setIsDone(true);
      setIsLoading(false);
    } catch (error) {
      alert("1", error.message);
      console.log("error", error.message);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <NewPostContext.Provider
      value={{
        isLoading,
        postData,
        handleChange,
        isDone,
        setIsDone,
        createNewPost,
        handleMediaChange,
        handleDeSelectMedia,
        popUpState,
        setPopUpState,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}

export const useNewPost = () => useContext(NewPostContext);
