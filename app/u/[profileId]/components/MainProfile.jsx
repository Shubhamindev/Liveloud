"use client";
import { useAuth } from "@/contexts/auth/context";
import { useParams } from "next/navigation";
import React from "react";
import EditProfileDiolog from "./EditProfileDiolog";
import { useEditUser } from "@/contexts/profile/context";
import DragDropProfile, { ProfileUpload } from "./ProfileUpload";
import { BannerUpload } from "./BannerUpload";
import { UseUserPostsStream, UseUserStream } from "@/lib/users/firebase_read";
import ShowMyPost from "./ShowMyPosts";
import { Separator } from "@/components/ui/separator";
import InsertLineBreak from "@/app/helpers/LineBreaker";
import { useFollow } from "@/contexts/follow/context";
import { ShowFollowersDiolog } from "./ShowFollowersDiolog";
import { ShowFollowingsDiolog } from "./ShowFollowingsDiolog";
import {
  UseUserFollowersStream,
  UseUserFollowingStream,
} from "@/lib/follow/firebase_read";

export default function MainProfile() {
  const { user, isLoading } = useAuth();
  const { profileId } = useParams();
  const { userData } = useEditUser();

  const { data, isLoading: loading, error } = UseUserPostsStream(profileId);


  const {
    error: isError,
    isLoading: loadingFollow,
    isDone,
    handleFollowUnfollow,
  } = useFollow();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(profileId);

  const banner = profile?.banner || "/placeholder-banner.png";

  const {
    data: userFollowers,
    isLoading: userFollowersLoading,
    error: userFollowersErroor,
  } = UseUserFollowersStream(profileId);

  const {
    data: userFollowing,
    isLoading: userFollowingLoading,
    error: userFollowingError,
  } = UseUserFollowingStream(profileId);

  // const {}

  // console.log(userData);

  if (!profile && !IsProfileLoading) {
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        No Profile Found ! Please Check URL {isProfileError}
      </div>
    );
  }

  // if (IsProfileLoading) {
  //   return (
  //     <div className="w-screen h-screen items-center justify-center flex">
  //       Loading...
  //     </div>
  //   );
  // }

  

  return (
    // <div class="container">
    <div className="w-screen flex flex-col">
      <div class="profile-card bg-gray-100 dark:bg-gray-800">
        <div
          style={{ backgroundImage: `url(${banner})` }}
          className={`relative border bg-cover bg-center m-[10px] rounded-t-[30px] profile-header`}
        >
          {user?.uid === profileId && (
            <div class="absolute text-white  bottom-2 end-2">
              <BannerUpload />
            </div>
          )}
          <div class="main-profile position:relative">
            <img src={profile?.photoURL} class="profile-image"></img>
            {/* <DragDropProfile /> */}
            {user?.uid === profileId && (
              <div class="absolute text-white bottom-2 left-24 ">
                <ProfileUpload />
              </div>
            )}
            <div class="profile-names pl-2 dark:bg-gray-800">
              <h1 class="username font-bold dark:text-white">
                {profile?.name}
              </h1>
              <small class="page-title dark:text-gray-100">
                @{profile?.handle || "..."}
              </small>
            </div>
          </div>
        </div>

        <div class="profile-body dark:bg-gray-800">
          <div class="profile-actions relative">
            {user?.uid === profileId ? (
              <EditProfileDiolog>
                <button class="follow absolute left-0">Edit</button>
              </EditProfileDiolog>
            ) : (
              <button
                disabled={loadingFollow}
                onClick={() => handleFollowUnfollow(profile?.uid)}
                class="follow"
              >
                {isLoading || loadingFollow
                  ? "Loading..."
                  : userFollowers?.some((item) => item?.id === user?.uid)
                  ? "UnFollow"
                  : "Follow"}
              </button>
            )}
            {/* {user?.uid != profileId && (
              <button class="message">Subscribe</button>
            )} */}

            <section class="bio">
              <div class="bio-header">
                <i class="fa fa-info-circle"></i>
                Bio
              </div>
              <p class="bio-text">
                {InsertLineBreak({
                  inputString: profile?.bio || "",
                  characters: 15,
                })}
              </p>
            </section>
            {/* {JSON.stringify(data)} */}
          </div>

          <div class="account-info">
            <div class="data bg-white p-4 rounded-lg shadow-md">
              <div class="important-data">
                <section class="data-item">
                  <h3 class="value font-bold">{data?.length || 0}</h3>
                  <small class="title font-semibold">Post</small>
                </section>
                <ShowFollowersDiolog>
                  <section class="data-item hover:cursor-pointer">
                    <h3 class="value font-bold">
                      {userFollowers?.length || 0}
                    </h3>
                    <small class="title font-semibold">Follower</small>
                  </section>
                </ShowFollowersDiolog>
                <ShowFollowingsDiolog>
                  <section class="data-item hover:cursor-pointer">
                    <h3 class="value font-bold">
                      {userFollowing?.length || 0}
                    </h3>
                    <small class="title font-semibold">Following</small>
                  </section>
                </ShowFollowingsDiolog>
                <section class="data-item">
                  <h3 class="value font-bold">
                    {data?.reduce((acc, item) => {
                      console.log(acc, item?.totalLikes);
                      return acc + (item?.totalLikes || 0);
                    }, 0) || 0}
                  </h3>
                  <small class="title font-semibold">Likes</small>
                </section>
                <section class="data-item ">
                  <h3 class="value font-bold">
                    {data?.reduce((acc, item) => {
                      return acc + (item?.totalComments || 0);
                    }, 0) || 0}
                  </h3>
                  <small class="title font-semibold">Comments</small>
                </section>
                <section class="data-item ">
                  <h3 class="value font-bold">
                    {data?.reduce((acc, item) => {
                      return acc + (item?.totalAmplified || 0);
                    }, 0) || 0}
                  </h3>
                  <small class="title font-semibold">Amplified</small>
                </section>
              </div>
            </div>

            {/* <div class="social-media">
                {InsertLineBreak({
                  inputString: profile?.bio || "",
                  characters: 50,
                })}
            </div> */}

            <div class="last-post">
              <div class="post-cover">
                <span class="last-badge ">Last Post</span>
                <img
                  src={
                    data?.sort((a, b) => {
                      return b?.createdAt?.seconds - a?.createdAt?.seconds;
                    })[0]?.media[0]?.url || "/placeholder-banner.png"
                  }
                  className="h-full w-full"
                />
              </div>
              <h3 class="post-title">
                {data
                  ?.sort((a, b) => {
                    return b?.createdAt?.seconds - a?.createdAt?.seconds;
                  })[0]
                  ?.content.slice(0, 20)}
              </h3>
              {/* <button class="post-CTA">View</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center  justify-center">
        <h1 className="text-2xl font-bold">{profile?.name}&apos;s Post</h1>
        <Separator className="my-2" />
        <ShowMyPost />
      </div>
    </div>
  );
}
