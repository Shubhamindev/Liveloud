import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import useSWRSubscription from "swr/subscription";
  import { useState } from "react";



export const UseUserFriendsStream = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: following, error } = useSWRSubscription(
    [`users/${user?.uid}/following`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  const { data: followers, error: followerError } = useSWRSubscription(
    [`users/${user?.uid}/followers`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );

  const followingIds = following?.map((user) => user.id);
  const followersIds = followers?.map((user) => user.id);

  const friends = followingIds?.filter((id) => followersIds?.includes(id));

  return { friends, error, isLoading };
};
