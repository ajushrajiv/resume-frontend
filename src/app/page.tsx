"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import KeywordGenerator from '@/components/keyword-generator/KeywordGenerator';
import HomeResume from '@/components/home-resume/HomeResume';
import CompareJobResume from '@/components/compare-job-resume/CompareJobResume';
import DashboardResume from '@/components/dashboard-resume/DashboardResume';
import NavbarResume from '@/components/navbar-resume/NavbarResume';
import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import fetchalldetails from '@/api/v1/dashboard/DashboardQueries';
import SummaryJobResume from '@/components/summary-job-resume/SummaryJobResume';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [details, setDetails] = useState<DescriptionResumeInfo[]>([]);

    useEffect(() => {
        async function getDetails() {
            const response = await fetchalldetails();
            const data = response.data
            setDetails(data);
        }

        getDetails();
    }, []);

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
      {pathname === "/dashboard-resume" && <DashboardResume results={details}/>}
      {pathname === "/summary-job-resume" && <SummaryJobResume />}
    </div>
  );
}
