"use client";
import { useAuth } from "@/contexts/auth/context";
import { usePremium } from "@/contexts/premium/context";
import { UseActiveSubscriptionStream } from "@/lib/premium/firebase_read";
import { UseUserStream } from "@/lib/users/firebase_read";
import moment from "moment";
import React from "react";

export default function Main() {
  const { selectedPackage, setSelectedPackage, payToSubscribe, isLoading } =
    usePremium();

  const { user } = useAuth();

  const {
    data: profile,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(user?.uid);

  const {
    data: activeSubscription,
    error: subError,
    isLoading: subLoading,
  } = UseActiveSubscriptionStream(profile);

  return (
    <div class="w-full text-center rounded-md  p-8 shadow-xs">
      <div class="mb-6 flex items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800">Premium Account</h2>
      </div>

      <p class="mb-4 text-gray-600">
        Upgrade to our Premium Account for an enhanced social media experience
        with the following exclusive features:
      </p>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">
            Enhanced Experience
          </h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Ads in For You feed</li>
            <li>Full reply boost functionality</li>
            <li>Smallest edit post option</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Longer Posts</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Undo post feature</li>
            <li>Post longer videos</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Top Articles</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Reader mode for articles</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Video Features</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Background video playback</li>
            <li>Download videos for offline viewing</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap justify-between gap-4">
        {activeSubscription ? (
          <div
            class={`flex-1 rounded-md bg-white cursor-pointer hover:outline outline-gray-300 p-4`}
          >
            <p class="text-sm text-gray-600">
              Active Subscription :{" "}
              <span className="uppercase font-bold">
                {activeSubscription?.subscriptionType}
              </span>
            </p>
            <p class="text-lg font-bold text-gray-800">
              Expires In :{" "}
              {moment(activeSubscription?.endTime?.toDate()).diff(
                new Date(),
                "days"
              ) == 0
                ? "Today"
                : moment(activeSubscription?.endTime?.toDate()).diff(
                    new Date(),
                    "days"
                  ) +
                  1 +
                  " days"}
            </p>
          </div>
        ) : subLoading ? (
          <div
            class={`flex-1 rounded-md bg-white cursor-pointer hover:outline outline-gray-300 p-4`}
          >
            {/* <p class="text-sm text-gray-600">Monthly Subscription</p> */}
            <p class="text-lg font-bold text-gray-800">Loading...</p>
          </div>
        ) : (
          <>
            <div
              onClick={() => setSelectedPackage("monthly")}
              class={`flex-1 rounded-md bg-white cursor-pointer ${
                selectedPackage === "monthly" && "outline"
              } hover:outline outline-gray-300 p-4`}
            >
              <p class="text-sm text-gray-600">Monthly Subscription</p>
              <p class="text-lg font-bold text-gray-800">2,000 XP</p>
            </div>
            <div
              onClick={() => setSelectedPackage("yearly")}
              class={`flex-1 rounded-md bg-white cursor-pointer ${
                selectedPackage === "yearly" && "outline"
              } hover:outline outline-gray-300 p-4`}
            >
              <p class="text-sm text-gray-600">Annual Subscription</p>
              <p class="text-lg font-bold text-gray-800">20,000 XP</p>
            </div>
          </>
        )}
      </div>

      <div class="mt-4 flex items-center justify-center">
        {!subLoading && (
          <>
            {!activeSubscription && (
              <button
                disabled={isLoading || subLoading}
                onClick={() =>
                  payToSubscribe(selectedPackage === "monthly" ? 2000 : 20000)
                }
                class="cursor-pointer rounded-md border bg-[#009ED9] px-4 py-2 text-white hover:border-[#009ED9] hover:bg-white hover:text-[#009ED9]"
              >
                {isLoading ? "Loading..." : "Subscribe Now"}
              </button>
            )}
          </>
        )}
      </div>

      <div class="mt-4 rounded-md border border-[#009ED9] p-4 text-sm text-gray-600">
        <p>
          By subscribing, you agree to our{" "}
          <u class="font-semibold text-[#009ED9] cursor-pointer">
            <em>Purchaser Terms of Service</em>
          </u>
          . Subscriptions auto-renew until canceled, as described in the Terms.
          Cancel anytime. Cancel at least 24 hours prior to renewal to avoid
          additional charges. A verified phone number is required to subscribe.
          If you&apos;ve subscribed on another platform, manage your
          subscription through that platform.
        </p>
      </div>
    </div>
  );
}
