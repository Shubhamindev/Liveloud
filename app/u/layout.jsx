"use client";
import React from "react";
import Sidebar, { SidebarItem } from "./components/SideBar";
import {
  Home,
  TrendingUp,
  Siren,
  Sparkles,
  Flame,
  Bell,
  Crown,
  Mail,
  Bookmark,
  User,
  Wallet,
  Gem,
  BadgePercent,
} from "lucide-react";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/context";
import NewPostProvider from "@/contexts/newPost/context";
import PostProvider from "@/contexts/posts/context";
import ChatContextProvider from "@/contexts/chatContext";
import FollowProvider from "@/contexts/follow/context";
import PremiumProvider from "@/contexts/premium/context";
import { UseUnReadNotificationStream } from "@/lib/notifications/firebase_read";

export default function Layout({ children }) {
  const path = usePathname();
  const router = useRouter();

  function extractValue(inputString) {
    // Using regular expression to find the value after "/u/" and before the next "/"
    const match = inputString.match(/\/u\/([^\/]+)/);

    // Check if there is a match
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  const activeComponent = extractValue(path);

  if (activeComponent === null) {
    router.push("/u/home");
  }

  const { navBar, setNavOpen, user } = useAuth();

  const { data } = UseUnReadNotificationStream(user);

  return (
    <div
      className={`flex flex-row overflow-hidden relative ${
        navBar ? "backdrop:blur-sm" : ""
      }`}
    >
<<<<<<< HEAD
      <Sidebar>
        <SidebarItem
          icon={<Home color="#009ED9" />}
          text="Home"
          active={activeComponent === "home"}
          link="/u/home"
        />
        <SidebarItem
          icon={<TrendingUp color="#009ED9" />}
          text="Trending"
          active={activeComponent === "trending"}
          link="#"
        />
        <SidebarItem
          icon={<Siren color="#009ED9" />}
          text="Latest"
          active={activeComponent === "latest"}
          link="#"
        />
        <SidebarItem
          icon={<Sparkles color="#009ED9" />}
          text="Popular"
          active={activeComponent === "popular"}
          link="#"
        />
        <SidebarItem
          icon={<Flame color="#009ED9" />}
          text="Hot"
          active={activeComponent === "hot"}
          link="#"
        />
        <SidebarItem
          icon={<Bell color="#009ED9" />}
          text="Notification"
          active={activeComponent === "notification"}
          link="/u/notifications"
        />
        <SidebarItem
          icon={<Crown color="#009ED9" />}
          text="Subscription"
          active={activeComponent === "subscription"}
          link="#"
        />
        <SidebarItem
          icon={<Mail color="#009ED9" />}
          text="Message"
          active={activeComponent === "message"}
          link="/u/message"
        />
        <SidebarItem
          icon={<Bookmark color="#009ED9" />}
          text="Bookmark"
          active={activeComponent === "bookmark"}
          link="#"
        />
        <SidebarItem
          icon={<User color="#009ED9" />}
          text="My Profile"
          active={activeComponent === "user"}
          link={`/u/${user?.uid}`}
        />
        <SidebarItem
          icon={<Wallet color="#009ED9" />}
          text="Wallet"
          active={activeComponent === "wallet"}
          link="#"
        />
        <SidebarItem
          icon={<Gem color="#009ED9" />}
          text="Premium account"
          active={activeComponent === "gem"}
          link="#"
        />
        <SidebarItem
          icon={<BadgePercent color="#009ED9" />}
          text="Referals"
          active={activeComponent === "referals"}
          link="#"
        />
      </Sidebar>
=======
      <PremiumProvider>
        <FollowProvider>
          <ChatContextProvider>
            <PostProvider>
              <NewPostProvider>
                <Sidebar>
                  <SidebarItem
                    icon={<Home color="#009ED9" />}
                    text="Home"
                    active={activeComponent === "home"}
                    link="/u/home"
                  />
                  <SidebarItem
                    icon={<TrendingUp color="#009ED9" />}
                    text="Trending"
                    active={activeComponent === "trending"}
                    link="/u/trending"
                  />
                  <SidebarItem
                    icon={<Siren color="#009ED9" />}
                    text="Latest"
                    active={activeComponent === "latest"}
                    link="/u/latest"
                  />
                  <SidebarItem
                    icon={<Sparkles color="#009ED9" />}
                    text="Popular"
                    active={activeComponent === "popular"}
                    link="/u/popular"
                  />
                  <SidebarItem
                    icon={<Flame color="#009ED9" />}
                    text="Hot"
                    active={activeComponent === "hot"}
                    link="/u/hot"
                  />
                  <SidebarItem
                    icon={<Bell color="#009ED9" />}
                    text="Notification"
                    active={activeComponent === "notification"}
                    link="/u/notifications"
                    alert={
                      data?.length > 0 && activeComponent !== "notification"
                    }
                  />
                  {/* <SidebarItem
                    icon={<Crown color="#009ED9" />}
                    text="Subscription"
                    active={activeComponent === "subscription"}
                    link="#"
                  /> */}
                  {/* <SidebarItem
                    icon={<Mail color="#009ED9" />}
                    text="Message"
                    active={activeComponent === "message"}
                    link="/u/message"
                  /> */}
                  <SidebarItem
                    icon={<Bookmark color="#009ED9" />}
                    text="Bookmark"
                    active={activeComponent === "bookmark"}
                    link="/u/bookmark"
                  />
                  <SidebarItem
                    icon={<User color="#009ED9" />}
                    text="My Profile"
                    active={activeComponent === "user"}
                    link={`/u/${user?.uid}`}
                  />
                  <SidebarItem
                    icon={<Wallet color="#009ED9" />}
                    text="Wallet"
                    active={activeComponent === "wallet"}
                    link="/u/wallet"
                  />
                  <SidebarItem
                    icon={<Gem color="#009ED9" />}
                    text="Premium account"
                    active={activeComponent === "premium"}
                    link="/u/premium"
                  />
                  <SidebarItem
                    icon={<BadgePercent color="#009ED9" />}
                    text="Referrals"
                    active={activeComponent === "referrals"}
                    link="/u/referrals"
                  />
                </Sidebar>
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2

                <section>{children}</section>
              </NewPostProvider>
            </PostProvider>
          </ChatContextProvider>
        </FollowProvider>
      </PremiumProvider>

      {/* <div className="w-72 lg:block hidden  border-l-2 ">fff</div> */}
    </div>
  );
}
