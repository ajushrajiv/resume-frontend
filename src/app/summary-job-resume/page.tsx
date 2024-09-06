"use client";
import SummaryJobResume from "@/components/summary-job-resume/SummaryJobResume";
import { NextUIProvider } from "@nextui-org/react";

export default function SummaryJobResumePage() {
  return (
    <NextUIProvider>
      <SummaryJobResume />
    </NextUIProvider>
  );
}
