"use client";

import KeywordGenerator from "@/components/keyword-generator/KeywordGenerator";
import { NextUIProvider } from "@nextui-org/react";

export default function GenerateKeywordPage() {
  return (
    <NextUIProvider>
      <KeywordGenerator />
    </NextUIProvider>
  );
}
