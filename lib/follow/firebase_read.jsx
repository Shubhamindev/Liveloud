import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebase";



export const UseUserFollowersStream = (user) => {
    const [isLoading, setIsLoading] = useState(true);

    const { data, error } = useSWRSubscription(
        [`users/${user}/followers`],
        ([path], { next }) => {
            const ref = collection(db, path);
            const unsubscribe = onSnapshot(
                ref,
                (snap) => {
                    setIsLoading(false);
                    next(null, snap.docs.map((doc) => doc.data()));
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
    return { data, error, isLoading };
  };


export const UseUserFollowingStream = (user) => {
    const [isLoading, setIsLoading] = useState(true);

    const { data, error } = useSWRSubscription(
        [`users/${user}/following`],
        ([path], { next }) => {
            const ref = collection(db, path);
            const unsubscribe = onSnapshot(
                ref,
                (snap) => {
                    setIsLoading(false);
                    next(null, snap.docs.map((doc) => doc.data()));
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
    return { data, error, isLoading };
  };