"use client";

import { Separator } from "@/components/ui/separator";
import NotificationCard from "./NotificationCard";
<<<<<<< HEAD

export default function ListView() {
  const dataList = [
    { id: 1, title: "Communication emails" },
    { id: 2, title: "Notification emails" },
    { id: 2, title: "Notification emails" },
    { id: 2, title: "Notification emails" },
    { id: 2, title: "Notification emails" },
  ];

  return (
    <>
      <h3 className="text-xl font-bold">Notifications</h3>
      <Separator className="my-2" />
      <div className="space-y-4">
        {dataList.map((item, index) => (
          <NotificationCard item={item} key={index} />
        ))}
=======
import { UseNotificationStream } from "@/lib/notifications/firebase_read";
import { useAuth } from "@/contexts/auth/context";
import { useEffect } from "react";
import { SetNotificationReaded } from "@/lib/notifications/firebase_write";

export default function ListView() {
  const { user } = useAuth();

  const { data, isLoading, error } = UseNotificationStream(user);

  useEffect(() => {
    SetNotificationReaded(user);
  }, [data, user]);

  return (
    <>
      <h3 className="text-xl font-bold px-2">Notifications</h3>
      <Separator className="my-2" />
      <div className="space-y-4 pb-20 p-4 h-screen overflow-y-scroll">
        {isLoading && !error && !data ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data.length === 0 ? (
          <p>No notifications</p>
        ) : (
          data
            ?.sort(
              (a, b) =>
                new Date(b?.createdAt).getTime() -
                new Date(a?.createdAt).getTime()
            )
            ?.map((item, index) => <NotificationCard item={item} key={index} />)
        )}
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2
      </div>
    </>
  );
}
