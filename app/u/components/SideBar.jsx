"use client";
import { useAuth } from "@/contexts/auth/context";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import ProfilePopOver from "./ProfilePopOver";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase";
import Initials from "@/app/helpers/NameToAvtaar";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const { user, isLoading, navOpen, setNavOpen } = useAuth();

  useEffect(() => {
    function handleWindowResize() {
      var windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        setExpanded(false);
      }
    }

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();
  }, []);

  useEffect(() => {
    if (navOpen) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [navOpen]);

  return (
    <aside className="h-screen overflow-y-scroll bg-white dark:bg-gray-800 border-r dark:border-gray-200 overflow-x-hidden z-10 shadow-sm w-fit fixed whitespace-nowrap ">
      <nav
        onMouseLeave={() => setNavOpen(false)}
        onMouseEnter={() => {
          setNavOpen(true);
        }}
        className="h-full flex flex-col w-full bg-white dark:bg-gray-800 "
      >
        <div className="pl-6 pt-4 pb-2 border-1 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-[#009ed9] text-3xl">
            <img
              src="/pnglogo.png"
              className={`overflow-hidden transition-all ${
                expanded ? "w-8" : "w-8"
              }`}
              alt="logo"
            />{" "}
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-fit" : "w-0"
              }`}
            >
              LIVELOUD
            </span>
          </div>
          {/* <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >nmb-zfxa-mhv
            {/* {expanded ? <ChevronFirst /> : <ChevronLast />} */}
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex-1 px-3"
          >
            {children}
          </ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          {/* <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          /> */}
          <Avatar className="w-10 h-10 rounded-md border border-white">
            <Link href={`/u/${user?.uid}`}>
              <AvatarImage
                src={user?.photoURL || "/pnglogo.png"}
                alt="avtaar"
                className="object-cover object-center w-full h-full rounded-md border-white hover:cursor-pointer"
              />
            </Link>
            <AvatarFallback>{Initials(user?.displayName)}</AvatarFallback>
          </Avatar>
          <Link
            href={`/u/${user?.uid}`}
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 hover:cursor-pointer">
              <h4 className="font-semibold dark:text-white">
                {isLoading ? "Loading..." : user?.displayName ?? ""}
              </h4>
              <span className="text-xs dark:textgr text-gray-600">
                {isLoading ? "Loading..." : user?.email ?? ""}
              </span>
            </div>
            {/* <MoreVertical size={20} /> */}
            <ProfilePopOver />
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, link }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={link}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
         rounded-md cursor-pointer
        transition-colors group font-semibold
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 dark:text-black"
            : "hover:bg-indigo-50 text-gray-600 dark:text-white hover:dark:text-black"
        }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
