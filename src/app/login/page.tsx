"use client";
import Login from "@/components/login/Login";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import { NextUIProvider } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <Login />
    </NextUIProvider>
  );
}
