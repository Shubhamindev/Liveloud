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

export const GetAllPosts = async () => {
  var posts = [];

  const postsRef = collection(db, "posts");
  const snapshot = await getDocs(postsRef);

  snapshot.forEach(async (doc) => {
    const userDetails = await fetchUser(doc.data().owner);
    if (!userDetails) {
      return;
    }
    posts.push({
      ...doc.data(),
      userDetails: userDetails,
    });
  });

  return posts;
};

const fetchUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

export const UsePostsStream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription([`posts`], ([path], { next }) => {
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
  });
  return { data, error, isLoading };
};

export const UsePostUsertStream = (uid) => {
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
export const UsePostByIdtStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}`],
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

export const UsePostLikesStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/likes`],
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
export const UsePostRepostStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/reposted`],
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

export const UsePostDisLikesStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/dislikes`],
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

export const UsePostSavedStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/saved`],
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

export const UsePostSharedStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/shared`],
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

export const UsePostCommentsStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/comments`],
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

export const UsePostAmplifiedStream = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`posts/${postId}/amplified`],
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



