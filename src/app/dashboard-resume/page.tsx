"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import DashboardResume from "@/components/dashboard-resume/DashboardResume";
import { NextUIProvider } from "@nextui-org/react";

export default function DashboardPage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <DashboardResume />
    </NextUIProvider>
  );
}
