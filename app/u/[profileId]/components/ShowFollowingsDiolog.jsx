import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth/context";
import { UseUserStream } from "@/lib/users/firebase_read";
import { useParams } from "next/navigation";
import FollowerShowCard from "./FollowerShowCard";
import FollowingShowCard from "./FollowingShowCard";
import {
  UseUserFollowersStream,
  UseUserFollowingStream,
} from "@/lib/follow/firebase_read";

export function ShowFollowingsDiolog({ children }) {
  const { user, isLoading } = useAuth();

  const { profileId } = useParams();

  const {
    data: profile,
    isLoading: IsProLoading,
    error: isProfileError,
  } = UseUserStream(profileId);

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

  return (
    <Dialog className="max-h-screen sm:min-h-[60%]">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  overflow-hidden">
        <DialogHeader>
          <DialogTitle>{profile?.name}&apos;s followings</DialogTitle>
        </DialogHeader>

        {userFollowingLoading && !userFollowing && <p>Loading...</p>}
        {isProfileError && <p>{isProfileError.message}</p>}
        {userFollowing?.length === 0 && (
          <DialogDescription>
            <p className="text-center">No following yet</p>
          </DialogDescription>
        )}
        <div className="w-full h-full pb-10 overflow-auto">
          {userFollowing?.map((followingId, index) => {
            return (
              <FollowingShowCard key={index} followerId={followingId?.id} />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
