"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import Signup from "@/components/signup/Signup";
import { NextUIProvider } from "@nextui-org/react";

export default function SignupPage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <Signup />
    </NextUIProvider>
  );
}
