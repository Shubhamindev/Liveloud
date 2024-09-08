import { useEffect, useState } from "react";
import { db } from "../firebase";
import useSWRSubscription from "swr/subscription";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const validateHandle = async (user, handle) => {
  try {
    if (!user || !handle) return false;

    const handleRef = query(
      collection(db, "users"),
      where("handle", "==", handle)
    );

    const snapshot = await getDocs(handleRef);

    console.log(snapshot);

    if (snapshot?.docs?.length > 0) {
      if (snapshot.docs[0].id === user.uid) {
        return true;
      }
      return false;
    }

    return true;
  } catch (e) {
    console.log("validate", e);
    return e.message;
  }
};

export const getUserProfile = async (user) => {
  try {
    if (!user) return false;

    const userRef = doc(db, "users", user);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }
    return false;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};

export const UseUserStream = (uid) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${uid}`],
    ([path], { next }) => {
      const ref = doc(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(null, snap.exists() ? snap.data() : null);
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

export const UseUserPostsStream = (uid) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription([`posts`], ([path], { next }) => {
    const ref = query(collection(db, path), where("owner", "==", uid));
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
  });
  return { data, error, isLoading };
};

export const UseUserSavedPostsStream = (uid, savedPostIds) => {
  const [isLoading, setIsLoading] = useState(true);

  const { data: posts, error } = useSWRSubscription(
    [`posts`],
    ([path], { next }) => {
      const ref = query(
        collection(db, path),
        where("postId", "in", savedPostIds)
      );
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

  return { data: posts, error, isLoading };
};

export const UseUserSavedPostIdsStream = (uid) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: saved, error } = useSWRSubscription(
    [`users/${uid}/saved`],
    ([path], { next }) => {
      const ref = query(collection(db, path));
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

  return { data: saved, error, isLoading };
};
export const UseUserPostIdsStream = (uid) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: saved, error } = useSWRSubscription(
    [`users/${uid}/posts`],
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

  return { data: saved, error, isLoading };
};




  

