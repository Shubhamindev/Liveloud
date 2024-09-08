import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UsePostByIdtStream } from "./firebase_read";

export const CreateNewPost = async ({ user, post }) => {
  console.log("post data ", post);
  var finalData = {
    ...post,
    owner: user.uid,
    likes: [],
    dislikes: [],
    comments: [],
    amplified: [],
    shared: [],
    visibility: "public",
    flag: "flag",
    createdAt: new Date(),
    totalLikes: 0,
    totalComments: 0,
    totalAmplified: 0,
    totalShared: 0,
  };

  if (post?.media.length > 0) {
    await uploadFilesToStorage(user, post?.media).then((result) => {
      finalData = {
        ...finalData,
        media: result,
      };
    });
  }

  const postRef = collection(db, "posts");

  console.log("finalData", finalData);

  try {
    await addDoc(postRef, finalData).then(async (docRef) => {
      console.log("Document written with ID: ", docRef.id);
      finalData = { ...finalData, postId: docRef.id };
      await updateDoc(doc(db, "posts", docRef.id), { postId: docRef.id });
    });

    await addDoc(collection(db, `users/${user.uid}/posts`), {
      postId: finalData?.postId,
      createdAt: new Date(),
    });
    return true;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};

export async function uploadFilesToStorage(user, mediaArray) {
  const resultArray = [];

  for (const mediaObject of mediaArray) {
    const file = mediaObject.file;
    const type = mediaObject.type;

    console.log(mediaObject);

    if (type == "gif") {
      resultArray.push({ type: type, url: file.url });
      continue;
    }

    // const fileRef = storage.ref().child(`${type}/${file.name}`);
    const storageRef = ref(
      storage,
      `${user.uid}/posts/${type}/${file.name}-${new Date().getTime()}}`
    );

    try {
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(storageRef);
        })
        .then(async (downloadUrl) => {
          resultArray.push({
            type: type,
            url: downloadUrl,
            fileName: mediaObject?.name,
          });
        });
    } catch (error) {
      console.error(`Error uploading file ${file.name}: ${error.message}`);
      // You can handle errors here, e.g., retrying the upload or skipping the file
    }
  }

  return resultArray;
}

export const LikePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/likes`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then(async (querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/likes`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/likes`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });

        const docRef = query(
          collection(db, `posts/${postId}/dislikes`),
          where("uid", "==", user.uid)
        );

        await getDocs(docRef).then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((docd) => {
              console.log(docd.id, " => ", docd.data());
              deleteDoc(doc(db, `posts/${postId}/dislikes`, docd.id));
            });
          }
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const DisLikePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/dislikes`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then(async (querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/dislikes`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/dislikes`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });

        const docRef = query(
          collection(db, `posts/${postId}/likes`),
          where("uid", "==", user.uid)
        );

        await getDocs(docRef).then(async (querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((docd) => {
              console.log(docd.id, " => ", docd.data());
              deleteDoc(doc(db, `posts/${postId}/likes`, docd.id));
            });
          }
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SavePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/saved`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/saved`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/saved`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });

    const docRef2 = query(
      collection(db, `users/${user.uid}/saved`),
      where("postId", "==", postId)
    );

    await getDocs(docRef2).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `users/${user.uid}/saved`, docd.id));
        });
      } else {
        addDoc(collection(db, `users/${user.uid}/saved`), {
          postId: postId,
          createdAt: new Date(),
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SharePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/shared`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size <= 0) {
        addDoc(collection(db, `posts/${postId}/shared`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const AmplifyPost = async (user, postId, ownerId, isQuote, quote) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/amplified`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/amplified`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/amplified`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });

    // check if alredy amplified by user

    const docRef2 = query(
      collection(db, `posts/${postId}/amplified`),
      where("uid", "==", user.uid)
    );

    var isAmplified = false;

    await getDocs(docRef2).then((querySnapshot) => {
      // if found then return the whole function as "already amplified"
      if (querySnapshot.size > 0) {
        isAmplified = true;
        console.log("already_amplified");
      }
    });

    if (isAmplified) {
      return "already_amplified";
    }

    // createing new post with same data by user

    const postRef = collection(db, "posts");

    const postDoc = await getDoc(doc(db, "posts", postId));

    const post = postDoc.data();

    var newContent = post.content;

    if (isQuote) {
      newContent = newContent + "\n" + quote;
    }

    var finalData = {
      ...post,
      owner: user.uid,
      likes: [],
      dislikes: [],
      comments: [],
      amplified: [],
      shared: [],
      visibility: "public",
      flag: "flag",
      createdAt: new Date(),
      totalLikes: 0,
      totalComments: 0,
      totalAmplified: 0,
      totalShared: 0,
      content: newContent,
      isAmplified: true,
    };

    try {
      await addDoc(postRef, finalData).then(async (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        finalData = { ...finalData, postId: docRef.id };
        await updateDoc(doc(db, "posts", docRef.id), { postId: docRef.id });
      });

      await addDoc(collection(db, `users/${user.uid}/posts`), {
        postId: finalData?.postId,
        createdAt: new Date(),
      });
    } catch (error) {}

    return true;
  } catch (error) {
    return false;
  }
};

export const CommentPost = async (user, postId, ownerId, comment) => {
  try {
    addDoc(collection(db, `posts/${postId}/comments`), {
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      comment: comment,
      createdAt: new Date(),
      ownerId: ownerId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const DeletePost = async (user, postId) => {
  const postRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postRef);
  const post = postDoc.data();

  if (post.owner !== user.uid) {
    return false;
  }

  try {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const ReportPost = async (user, postId, ownerId, report) => {
  try {
    addDoc(collection(db, `posts/${postId}/reports`), {
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      report: report,
      createdAt: new Date(),
      reporterId: ownerId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RepostPost = async (postId, user) => {
  var postData = {};
  const postRef = doc(db, `posts/${postId}`);

  const snapShot = await getDoc(postRef);

  if (snapShot.exists) {
    postData = snapShot.data();
  }

  const prevOwner = postData?.owner;

  var newPostData = { ...postData, owner: user?.uid, repostedFrom: prevOwner };

  await addDoc(collection(db, "posts"), newPostData).then(async (docRef) => {
    console.log("Document written with ID: ", docRef.id);
    newPostData = { ...newPostData, postId: docRef.id };
    await updateDoc(doc(db, "posts", docRef.id), { postId: docRef.id });
  });

  await addDoc(collection(db, `posts/${postId}/reposted`), {
    createdAt: new Date(),
    uid: user?.uid,
  });

  await addDoc(collection(db, `users/${user.uid}/posts`), {
    postId: newPostData?.postId,
    createdAt: new Date(),
  });
};
