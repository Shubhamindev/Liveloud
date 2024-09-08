import { GoogleIcon, MetamaskIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/context";
import { useState } from "react";

export default function AuthenticationPage() {
  const {
    signInWithGoogle,
    signUpUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    handleChange,
    userData,
    emailPasswordResetSend,
    error,
    isLogin,
    setIsLogin,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section class="h-screen ">
        <div class="container h-full px-6 py-24">
          <div class="g-6 flex h-full relative flex-wrap items-center justify-center lg:justify-between">
            <div class="mb-12 hidden  md:block md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="/logobig.png"
                class="w-full bg-blend-multiply"
                alt="Phone image"
              />
            </div>

            <div class="md:w-8/12 lg:ml-6 lg:w-5/12 bg-gray-100 rounded-md ">
              <h1 class="text-4xl font-bold mb-8 text-center text-primary">
                Sign {isLogin ? "in" : "up"} to LIVELOUD
              </h1>
              {/* {error} */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  await signUpUserWithEmailAndPassword(
                    userData?.email,
                    userData?.password
                  );
                  setIsLoading(false);
                }}
              >
                {!isLogin && (
                  <div class="relative mb-6" data-te-input-wrapper-init>
                    <Input
                      disabled={isLogin}
                      type="text"
                      className="dark:border-white dark:text-white"
                      // class="peer block min-h-[auto] w-full rounded border dark:text-black dark:placeholder:text-black dark:shadow dark:bg-white bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="Name"
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                )}

                <div class="relative mb-6" data-te-input-wrapper-init>
                  <Input
                    type="text"
                    className="dark:border-white dark:text-white"
                    // class="peer block min-h-[auto] w-full rounded border dark:text-black dark:placeholder:text-black dark:shadow dark:bg-white bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Email Address"
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div class="relative mb-6" data-te-input-wrapper-init>
                  <Input
                    type="password"
                    className="dark:border-white dark:text-white"
                    // class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput33"
                    placeholder="Password"
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>

                <div class="mb-6 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      emailPasswordResetSend(userData?.email);
                    }}
                    class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  disabled={isLoading}
                  className="w-full font-bold"
                  type="submit"
                >
                  {isLoading ? "Loading" : isLogin ? "Sign In" : "Sign Up"}
                </Button>

                <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>

                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    await signInWithGoogle();
                    setIsLoading(false);
                  }}
                  className="w-full mb-2 font-bold"
                  // class="mb-3 flex gap-2 w-full bg-white font-black items-center text-gray-600 justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  href="#!"
                  role="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
                <Button
                  className="w-full font-bold"
                  // class="mb-3 flex gap-2 w-full bg-[#55acee] font-black items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                  // style="background-color: #55acee"
                  href="#!"
                  role="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <MetamaskIcon />
                  Wallet Connect
                </Button>
              </form>
              <p className="py-2">
                {isLogin
                  ? "Don't have a account? "
                  : "Already have an account? "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="hover:underline text-blue-500 cursor-pointer"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
