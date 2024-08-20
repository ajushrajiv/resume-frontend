"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import KeywordGenerator from '@/components/keyword-generator/KeywordGenerator';
import HomeResume from '@/components/home-resume/HomeResume';
import CompareJobResume from '@/components/compare-job-resume/CompareJobResume';
import DashboardResume from '@/components/dashboard-resume/DashboardResume';
import NavbarResume from '@/components/navbar-resume/NavbarResume';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/home-resume");
    }
  }, [pathname, router]);
  
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
