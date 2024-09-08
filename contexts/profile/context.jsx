"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getUserProfile, validateHandle } from "@/lib/users/firebase_read";
import {
  updateUserProfile,
  uploadBannerPic,
  uploadProfilePic,
} from "@/lib/users/firebase_write";
import { useAuth } from "../auth/context";

const EditUserContext = createContext();

export default function EditUserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const [userData, setUserData] = useState(null);

  const { profileId } = useParams();

  const handleChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    setIsDone(false);
    if (userData.name === "") {
      alert("Name is required");
      setIsLoading(false);
      return;
    }
    if (userData.handle === "") {
      alert("Handle is required");
      setIsLoading(false);
      return;
    }
    try {
      const validation = await validateHandle(user, userData?.handle);
      if (!validation) {
        alert("Handle already exists");
        setIsLoading(false);
        return;
      }
      if (validation != false && validation != true) {
        alert(validation);
        setIsLoading(false);
        return;
      }

      const updated = await updateUserProfile(user, userData);

      if (!updated) {
        alert("Something went wrong 1");
        setIsLoading(false);
        return;
      }

      alert("Profile updated successfully");
      setIsDone(true);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      alert("Something went wrong 2");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const fetchedUser = await getUserProfile(profileId);
      if (fetchedUser && !userData) {
        setUserData(fetchedUser);
        setUserData({ ...fetchedUser, oldHandle: fetchedUser?.handle || "" });
      }
    };

    // console.log(userData);
    if (user) {
      getUserData();
    }
  }, [user, userData, isDone]);

  // console.log("fertxched", userData);

  const handleUploadProfilePic = async (file) => {
    setIsLoading(true);
    setIsDone(false);
    try {
      const uploaded = await uploadProfilePic(user, file);

      if (!uploaded) {
        alert("Something went wrong 1");
        setIsLoading(false);
        return;
      }

      alert("Profile updated successfully");
      setIsLoading(false);
      setIsDone(true);
    } catch (e) {
      setError(e.message);
      alert("Something went wrong 2");
      setIsLoading(false);
    }
  };
  const handleUploadBannerPic = async (file) => {
    setIsLoading(true);
    setIsDone(false);
    try {
      const uploaded = await uploadBannerPic(user, file);

      if (!uploaded) {
        alert("Something went wrong 1");
        setIsLoading(false);
        return;
      }

      alert("Banner updated successfully");
      setIsDone(true);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      alert("Something went wrong 2");
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <EditUserContext.Provider
      value={{
        isLoading,
        userData,
        handleChange,
        handleUpdateUser,
        error,
        handleUploadProfilePic,
        handleUploadBannerPic,
      }}
    >
      {children}
    </EditUserContext.Provider>
  );
}

export const useEditUser = () => useContext(EditUserContext);
