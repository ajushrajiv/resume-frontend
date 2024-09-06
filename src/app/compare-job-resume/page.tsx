"use client";
import CompareJobResume from "@/components/compare-job-resume/CompareJobResume";
import { NextUIProvider } from "@nextui-org/react";

export default function CompareJobResumePage() {
  return (
    <NextUIProvider>
      <CompareJobResume />
    </NextUIProvider>
  );
}
