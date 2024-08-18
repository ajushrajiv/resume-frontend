"use client";

import NavbarResume from "@/components/navbar-resume/NavbarResume";
import HomeResume from "@/components/home-resume/HomeResume";
import { NextUIProvider } from "@nextui-org/react";

export default function HomePage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <HomeResume />
    </NextUIProvider>
  );
}
