"use client";

import NavbarResume from "@/components/navbar-resume/NavbarResume";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

export default function NavbarResumePage() {
  return  (
    <NextUIProvider>
      <NavbarResume />
    </NextUIProvider>
  );
}

