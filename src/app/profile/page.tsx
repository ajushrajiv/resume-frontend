"use client";

import Profile from "@/components/profile/Profile";
import { NextUIProvider } from "@nextui-org/react";

export default function ProfilePage() {
  return (
    <NextUIProvider>
      <Profile />
    </NextUIProvider>
  );
}
