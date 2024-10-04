import React, { Suspense } from "react";
import CompareJobResume from "@/components/compare-job-resume/CompareJobResume";
import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Job&Resume - MatchMyResume",
  description: "Compares job descriptions with the resumes to calculate a match percentage"
};

export default function CompareJobResumePage() {
  return (
    <NextUIProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <CompareJobResume />
      </Suspense>
    </NextUIProvider>
  );
}
