import React from "react";

export default function Initials(fullName) {
  const nameParts = fullName?.split(" ");

  if (!nameParts) {
    return <strong>AV</strong>;
  }

  const firstInitial =  nameParts[0] ? nameParts[0]?.charAt(0) : "";

  const lastInitial = nameParts[1]
    ? nameParts[1]?.charAt(0)
    : nameParts[0]?.slice(0, 2);

  return (
    <strong>
      {firstInitial} {lastInitial}
    </strong>
  );
}
