"use client";
import React from "react";
import NextNProgress from "nextjs-progressbar";

export default function Loader() {
  return (
    <NextNProgress
      color="#fff"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
}
