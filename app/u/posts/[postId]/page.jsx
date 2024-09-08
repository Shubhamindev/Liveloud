"use client";
import { useParams, useRouter } from "next/navigation";
import Post from "../../home/components/Post";
import Advertisement from "../../home/components/leftComponents/Advertisement";
import RecommendedProfiles from "../../home/components/leftComponents/RecommendedProfiles";
import Add from "../../home/components/rightComponents/add";
import CardWithSearchBar from "../../home/components/rightComponents/searchbar";
import Subscribe from "../../home/components/rightComponents/subscribe";
import Trends from "../../home/components/rightComponents/trends";
import { UsePostByIdtStream } from "@/lib/posts/firebase_read";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function Page() {
  const { postId } = useParams();
  const router = useRouter();

  const { data, error, isLoading } = UsePostByIdtStream(postId);
  return (
    <>
      <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
        <div className="flex w-full h-full justify-center">
                  <div className="w-1/4 p-4 hidden overflow-y-scroll h-screen lg:flex flex-col gap-4">

            {/* Left Section */}
            <div className="h-3/4">
              <RecommendedProfiles />
            </div>
            <Advertisement />
          </div>

          <div className="lg:w-1/2 w-full flex-col gap-5 pb-10 pt-5 items-center flex overflow-hidden h-full ">
            <div className="w-full p-2 border-b ">
              {/* <Button>Back</Button> */}
              <ArrowLeftCircle
                onClick={() => {
                  router.back();
                }}
                className=" cursor-pointer"
              />
            </div>
            <div className="w-full ">
              {/* Center Section */}
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div>{error.message}</div>
              ) : (
                <Post post={data} />
              )}
            </div>
          </div>
          <div className="w-1/4 hidden h-full overflow-y-scroll lg:flex gap-4 flex-col p-4">
            {/*right section*/}
            <CardWithSearchBar />
            <Subscribe />
            <Trends />
            <Add />
          </div>
        </div>
      </div>
    </>
  );
}
