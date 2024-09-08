import { data } from "autoprefixer";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  collection,
  query,
  addDoc,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import useSWRSubscription from "swr/subscription";

export const FollowUnfollow = async (user, profileId) => {
  try {
    const docRef = query(
      collection(db, `users/${user?.uid}/following`),
      where("id", "==", profileId)
    );

    const docSnap = await getDocs(docRef);

    console.log("docSnap", docSnap);

    const alreadyFollowing = docSnap?.docs?.length > 0 ? true : false;

    console.log("alreadyFollowing", alreadyFollowing);

    if (alreadyFollowing) {
      if (docSnap?.empty) {
        console.log("empty");
        return false;
      }

      docSnap?.forEach((doc) => {
        deleteDoc(doc?.ref);
      });

      const snapp = await getDocs(
        query(
          collection(db, `users/${profileId}/followers`),
          where("id", "==", user?.uid)
        )
      );

      if (snapp?.empty) {
        console.log("empty");
        return false;
      }

      snapp?.forEach((doc) => {
        deleteDoc(doc?.ref);
      });

      console.log("unfollowed");

      return true;
    } else {
      await addDoc(collection(db, `users/${user?.uid}/following`), {
        id: profileId,
        uid: user?.uid,
      });
      await addDoc(collection(db, `users/${profileId}/followers`), {
        id: user?.uid,
        uid: user?.uid,
      });
      console.log("followed");
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RemoveFollower = async (user, profileId) => {
  try {
    const userDelRef = await getDocs(
      query(
        collection(db, `users/${user?.uid}/followers`),
        where("id", "==", profileId)
      )
    );

    if (userDelRef?.empty) {
      console.log("empty 1");
      return false;
    }

    userDelRef?.forEach((doc) => deleteDoc(doc?.ref));

    const profileDelRef = await getDocs(
      query(
        collection(db, `users/${profileId}/following`),
        where("id", "==", user?.uid)
      )
    );

    if (profileDelRef?.empty) {
      console.log("empty 2");
      return false;
    }

    profileDelRef?.forEach((doc) => deleteDoc(doc?.ref));
    return true;
  } catch (error) {
    console.log("Error", error);
    alert(error);
    return false;
  }
};
