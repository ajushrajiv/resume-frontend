"use client";

import HomeResume from "@/components/home-resume/HomeResume";
import { UserProvider } from "@/contexts/UserContext";
import { NextUIProvider } from "@nextui-org/react";

export default function HomePage() {
  return (
    <NextUIProvider>
      <UserProvider>
        <HomeResume />
      </UserProvider>
    </NextUIProvider>
  );
}
