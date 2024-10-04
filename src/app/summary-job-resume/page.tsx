"use client";

import React, { Suspense } from "react";
import SummaryJobResume from "@/components/summary-job-resume/SummaryJobResume";
import { NextUIProvider } from "@nextui-org/react";

export default function SummaryJobResumePage() {
  return (
    <NextUIProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SummaryJobResume />
      </Suspense>
    </NextUIProvider>
  );
}
