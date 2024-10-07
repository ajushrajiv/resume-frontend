"use client";

import Health from "@/components/health/Health";
import { NextUIProvider } from "@nextui-org/react";

export default function HealthPage() {
  return (
    <NextUIProvider>
      <Health />
    </NextUIProvider>
  );
}
