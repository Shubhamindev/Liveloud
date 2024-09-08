"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Swal from "sweetalert2";
import {
  SendReferRequest,
  updateUserProfile,
} from "@/lib/users/firebase_write";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avtaar: "",
  });

  const handleChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (user) => {
        await SendReferRequest(user.user, localStorage.getItem("referId") ?? "")
          .then(() => {
            localStorage?.removeItem("referId");
          })
          .catch((error) => {
            alert("Error in refer request");
          });
        return user.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  const signUpUserWithEmailAndPassword = async (email, password) => {
    if (!isLogin) {
      if (!userData?.name) {
        setError("Please enter name");
        Swal.fire({
          title: "Error!",
          text: "Please enter name",
          icon: "error",
        });
        return;
      }
    }

    if (!email || !password) {
      setError("Please enter email and password");
      Swal.fire({
        title: "Error!",
        text: "Please enter email and password",
        icon: "error",
      });
      return;
    }

    const data = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await SendReferRequest(
          userCredential.user,
          localStorage?.getItem("referId") ?? ""
        )
          .then(() => {
            localStorage.removeItem("referId");
          })
          .catch((error) => {
            alert("Error in refer request");
          });

        // return {
        //   status: true,
        // user: userCredential.user,
        // };
        return updateUserProfile(userCredential.user, userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          if (!isLogin) {
            Swal.fire({
              title: "Error!",
              text: "Email already in use",
              icon: "error",
            });
            return {
              status: false,
              message: "Email already in use",
              code: errorCode,
            };
          }
          signInUserWithEmailAndPassword(email, password);
          return;
        }

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
        return {
          status: false,
          message: errorMessage,
          code: errorCode,
        };
      });
    return data;
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      setError("Please enter email and password");
      Swal.fire({
        title: "Error!",
        text: "Please enter email and password",
        icon: "error",
      });
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .then((user) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
        // ..
      });
  };

  const emailPasswordResetSend = async (email) => {
    if (!email) {
      setError("Please enter email");
      Swal.fire({
        title: "Error!",
        text: "Please enter email",
        icon: "error",
      });
      return;
    }

    await sendPasswordResetEmail(auth, email).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      // ..
    });

    Swal.fire({
      title: "Success!",
      text: "Password reset email sent successfully",
      icon: "success",
    });
  };

  const logout = async () => {
    await signOut(auth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      // ..
    });
    // router.push('/');
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        emailPasswordResetSend,
        logout,
        userData,
        handleChange,
        error,
        setNavOpen,
        navOpen,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
