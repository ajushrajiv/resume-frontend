"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import SummaryJobResume from "@/components/summary-job-resume/SummaryJobResume";
import { NextUIProvider } from "@nextui-org/react";

export default function SummaryJobResumePage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <SummaryJobResume />
    </NextUIProvider>
  );
}
