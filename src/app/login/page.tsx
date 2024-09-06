"use client";
import Login from "@/components/login/Login";
import { NextUIProvider } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <NextUIProvider>
      <Login />
    </NextUIProvider>
  );
}
