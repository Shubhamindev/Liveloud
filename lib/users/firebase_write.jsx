import { updateProfile } from "firebase/auth";
import { db, storage } from "../firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

export const updateUserProfile = async (user, data) => {
  try {
    if (!user || !data) return "user or data is missing";

    const userRef = doc(db, "users", user?.uid);

    await updateDoc(userRef, data);

    await updateProfile(user, {
      displayName: data?.name ?? "",
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const uploadProfilePic = async (user, file) => {
  try {
    if (!user || !file) return "user or file is missing";

    console.log("user", file);

    const userRef = doc(db, "users", user?.uid);

    const storageRef = ref(storage, `users/${user?.uid}/profile.jpg`);

    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(storageRef);
      })
      .then(async (downloadUrl) => {
        await updateDoc(userRef, {
          photoURL: downloadUrl,
        });

        await updateProfile(user, {
          photoURL: downloadUrl,
        });
      });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const uploadBannerPic = async (user, file) => {
  try {
    if (!user || !file) return "user or file is missing";

    console.log("user", file);

    const userRef = doc(db, "users", user?.uid);

    const storageRef = ref(storage, `users/${user?.uid}/banner.jpg`);

    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(storageRef);
      })
      .then(async (downloadUrl) => {
        await updateDoc(userRef, {
          banner: downloadUrl,
        });
      });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const SendReferRequest = async (user, endUserId) => {
  try {
    if (!user || !endUserId || endUserId === "")
      return "user or data is missing";

    const userRef = doc(db, "users", user?.uid);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists) {
      const data = docSnap.data();

      if (data?.referedUsers?.includes(endUserId)) {
        return false;
      }
    }

    const Ref = collection(db, "refer_requests");

    const data = {
      from: user?.uid,
      to: endUserId,
      status: "pending",
      createdAt: new Date(),
    };

    await addDoc(Ref, data);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
