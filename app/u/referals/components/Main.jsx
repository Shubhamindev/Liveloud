"use client";
import { useAuth } from "@/contexts/auth/context";
import React from "react";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  XIcon,
  ViberShareButton,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

export default function Main() {
  const {user} = useAuth();
  return (
    <div class="text-center">
      <main class="max-w-screen-md mx-auto p-8">
        <div class=" overflow-hidden  h-auto w-36 mx-auto mb-4">
          <img
            src="/logobig.png"
            alt="Logo"
            class="object-cover w-full h-full"
          />
        </div>
        <h1 class="mb-4 text-3xl font-bold">Referral Program</h1>
        <p class="text-gray-600">
          Just share your Referral URL, and every time someone signs up with
          your referral link, you will earn TBD.
        </p>

        <section class="mt-6">
          <h2 class="mb-2 text-2xl font-semibold">Benefits</h2>
          <ul class="list-inside list-disc text-gray-600">
            <li>Earn commission for every referred user</li>
            <li>Access to exclusive promotional materials</li>
            <li>Monthly payouts and performance reports</li>
          </ul>
        </section>

        <section class="mt-6">
          <h2 class="mb-2 text-2xl font-semibold">Get Started</h2>
          Your Referral Link is <br />{" "}
          <u class="text-2xl font-bold text-[#009ED9]">
          http://localhost:3000/refered/{user?.uid}
          </u>
        </section>

        <section class="mt-6">
          <h2 class="mb-2 text-2xl font-semibold">Share Your Referral Link</h2>
          <div class="flex flex-wrap gap-4   justify-center">
            <FacebookShareButton url={"https://play.tailwindcss.com/"}>
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <TwitterShareButton url={"https://play.tailwindcss.com/"}>
              <XIcon size={50} round />
            </TwitterShareButton>
            <WhatsappShareButton url={"https://play.tailwindcss.com/"}>
              <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <TelegramShareButton url={"https://play.tailwindcss.com/"}>
              <TelegramIcon size={50} round />
            </TelegramShareButton>
            <LinkedinShareButton url={"https://play.tailwindcss.com/"}>
              <LinkedinIcon size={50} round />
            </LinkedinShareButton>
          </div>
        </section>
      </main>
    </div>
  );
}
