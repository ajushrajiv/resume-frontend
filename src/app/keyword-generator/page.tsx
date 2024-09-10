import KeywordGenerator from "@/components/keyword-generator/KeywordGenerator";
import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Generator - MatchMyResume",
  description: "Generate keywords for job descriptions and resumes to improve your match."
};

export default function GenerateKeywordPage() {
  return (
    <NextUIProvider>
      <KeywordGenerator />
    </NextUIProvider>
  );
}
