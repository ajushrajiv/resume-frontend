"use client";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import KeywordGenerator from "@/components/keyword-generator/KeywordGenerator";
import { NextUIProvider } from "@nextui-org/react";

export default function GenerateKeywordPage() {
  return (
    <NextUIProvider>
      <NavbarResume />
      <KeywordGenerator />
    </NextUIProvider>
  );
}
