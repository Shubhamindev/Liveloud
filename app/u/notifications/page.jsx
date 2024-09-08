<<<<<<< HEAD
import React from "react";
import ListView from "./components/ListView";



export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
        <div className="md:w-1/2 w-full overflow-hidden h-ful">
       
        <ListView/>
       
        
        </div>
        
        
=======
import TopTabs from "../home/components/TopTabs";
import Advertisement from "../home/components/leftComponents/Advertisement";
import RecommendedProfiles from "../home/components/leftComponents/RecommendedProfiles";
import Add from "../home/components/rightComponents/add";
import CardWithSearchBar from "../home/components/rightComponents/searchbar";
import Subscribe from "../home/components/rightComponents/subscribe";
import Trends from "../home/components/rightComponents/trends";
import ListView from "./components/ListView";

export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center">
                <div className="w-1/4 p-4 hidden overflow-y-scroll h-screen lg:flex flex-col gap-4">

          {/* Left Section */}
          <div className="h-3/4">
            <RecommendedProfiles />
          </div>
          <Advertisement />
        </div>
        <div className="lg:w-1/2 w-full py-4 overflow-hidden h-full ">
          {/* Center Section */}
          <ListView />
        </div>
        <div className="w-1/4 hidden h-full overflow-y-scroll lg:flex gap-4 flex-col p-4">
          {/*right section*/}
          <CardWithSearchBar />
          <Subscribe />
          <Trends />
          <Add />
        </div>
      </div>
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2
    </div>
  );
}
