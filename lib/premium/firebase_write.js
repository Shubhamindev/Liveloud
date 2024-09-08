import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";

export const SentPaymentRequestForSubscription = async (user, subscription) => {
  try {
    const docRef = collection(db, "payment_requests");

    const res = await addDoc(docRef, {
      uid: user.uid,
      for: subscription,
      createdAt: new Date(),
      status: "pending",
    });

    console.log(res);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false
  }
};
