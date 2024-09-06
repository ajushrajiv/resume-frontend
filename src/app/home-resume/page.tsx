"use client";

import HomeResume from "@/components/home-resume/HomeResume";
import { NextUIProvider } from "@nextui-org/react";

export default function HomePage() {
  return (
    <NextUIProvider>
      <HomeResume />
    </NextUIProvider>
  );
}
