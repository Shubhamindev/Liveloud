import { useState } from "react";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const UseActiveSubscriptionStream = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${user?.uid}/subscriptions/${user?.activeSubscription}`],
    ([path], { next }) => {
      const ref = doc(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(null, snap.exists() && snap ? snap.data() : null);
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
