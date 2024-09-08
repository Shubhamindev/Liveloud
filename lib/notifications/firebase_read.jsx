import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import useSWRSubscription from "swr/subscription";
import { useState } from "react";

export const UseNotificationStream = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${user?.uid}/notifications`],
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
  return { data, error, isLoading };
};

export const UseUnReadNotificationStream = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${user?.uid}/notifications`],
    ([path], { next }) => {
      const ref = query(collection(db, path), where("readed", "==", false));
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
  return { data, error, isLoading };
};
