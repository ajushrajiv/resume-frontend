"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import CompareJobResume from "@/components/compare-job-resume/CompareJobResume";
import { NextUIProvider } from "@nextui-org/react";

export default function CompareJobResumePage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <CompareJobResume />
    </NextUIProvider>
  );
}
