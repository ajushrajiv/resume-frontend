"use client";
import Signup from "@/components/signup/Signup";
import { NextUIProvider } from "@nextui-org/react";

export default function SignupPage() {
  return (
    <NextUIProvider>
      <Signup />
    </NextUIProvider>
  );
}
