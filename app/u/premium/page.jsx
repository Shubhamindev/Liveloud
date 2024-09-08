import Advertisement from "../home/components/leftComponents/Advertisement";
import RecommendedProfiles from "../home/components/leftComponents/RecommendedProfiles";
import CardWithSearchBar from "../home/components/rightComponents/searchbar";
import Subscribe from "../home/components/rightComponents/subscribe";
import Trends from "../home/components/rightComponents/trends";
import Add from "../home/components/rightComponents/add";
import Main from "./components/Main";

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
        <div className="lg:w-1/2 w-full py-4 overflow-x-hidden h-full ">
          {/* Center Section */}
          <Main />
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
  );
}
