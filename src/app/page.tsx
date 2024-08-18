"use client"

import { usePathname } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import React, { useState } from "react";
import KeywordGenerator from '@/components/keyword-generator/KeywordGenerator';
import HomeResume from '@/components/home-resume/HomeResume';
import CompareJobResume from '@/components/compare-job-resume/CompareJobResume';
import DashboardResume from '@/components/dashboard-resume/DashboardResume';
import NavbarResume from '@/components/navbar-resume/NavbarResume';

export default function Home() {
  const pathname = usePathname();

  return (
    <div>
      <NavbarResume />
      {pathname === "/home-resume" && <HomeResume />}
      {pathname === "/keyword-generator" && <KeywordGenerator />}
      {pathname === "/compare-job-resume" && <CompareJobResume />}
      {pathname === "/dashboard-resume" && <DashboardResume />}
    </div>
  );
}
