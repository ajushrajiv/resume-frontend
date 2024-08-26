"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import Signup from "@/components/signup/Signup";
import { NextUIProvider } from "@nextui-org/react";

export default function GenerateKeywordPage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <Signup />
    </NextUIProvider>
  );
}
