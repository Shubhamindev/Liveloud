import EditUserProvider from "@/contexts/profile/context";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <EditUserProvider>{children}</EditUserProvider>
    </div>
  );
}
