import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const SetNotificationReaded = (user) => {
  const notificationRef = collection(db, `users/${user.uid}/notifications`);
  const queryRef = query(notificationRef, where("readed", "==", false));
  getDocs(queryRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      updateDoc(doc(db, `users/${user.uid}/notifications`, doc.id), {
        readed: true,
      });
    });
  });
};
