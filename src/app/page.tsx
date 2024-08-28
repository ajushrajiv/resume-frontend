"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useContext } from "react";
import KeywordGenerator from '@/components/keyword-generator/KeywordGenerator';
import HomeResume from '@/components/home-resume/HomeResume';
import CompareJobResume from '@/components/compare-job-resume/CompareJobResume';
import DashboardResume from '@/components/dashboard-resume/DashboardResume';
import NavbarResume from '@/components/navbar-resume/NavbarResume';
import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import SummaryJobResume from '@/components/summary-job-resume/SummaryJobResume';
import Signup from '@/components/signup/Signup';
import fetchdetailsbyuserid from '@/api/v1/dashboard/DashboardQueries';
import UserContext from '@/contexts/UserContext';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [details, setDetails] = useState<DescriptionResumeInfo[]>([]);
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is undefined, make sure NavbarResume is wrapped in a UserProvider");
  }

  const { user } = userContext;

    useEffect(() => {
        async function getDetails() {
          if (user) {
            const response = await fetchdetailsbyuserid(user.id);
            const data = response.data
            setDetails(data);
          }
        }
        getDetails();
    }, [user]);

  return (
    <div>
      <NavbarResume />
      {pathname === "/" && <HomeResume />}
      {pathname === "/home-resume" && <HomeResume />}
      {pathname === "/keyword-generator" && <KeywordGenerator />}
      {pathname === "/compare-job-resume" && <CompareJobResume />}
      {pathname === "/dashboard-resume" && <DashboardResume results={details}/>}
      {pathname === "/summary-job-resume" && <SummaryJobResume />}
      {pathname === "/signup" && <Signup />}
    </div>
  );
}
