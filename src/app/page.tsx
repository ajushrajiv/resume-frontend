"use client"

import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useContext } from "react";
import KeywordGenerator from '@/components/keyword-generator/KeywordGenerator';
import HomeResume from '@/components/home-resume/HomeResume';
import CompareJobResume from '@/components/compare-job-resume/CompareJobResume';
import DashboardResume from '@/components/dashboard-resume/DashboardResume';
import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import SummaryJobResume from '@/components/summary-job-resume/SummaryJobResume';
import Signup from '@/components/signup/Signup';
import fetchdetailsbyuserid from '@/api/v1/dashboard/DashboardQueries';
import UserContext, { UserProvider } from '@/contexts/UserContext';

export default function Home() {
  const pathname = usePathname();
  const [details, setDetails] = useState<DescriptionResumeInfo[]>([]);
  
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is undefined, make sure NavbarResume is wrapped in a UserProvider");
  }

  const { user } = userContext;

    useEffect(() => {
        async function getDetails() {
          if (user) {
            try {
              const filteredData = await fetchdetailsbyuserid(user.id);
              setDetails(filteredData); 
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          }
        }
        getDetails();
    }, [user]);

    const routeComponentMap: { [key: string]: JSX.Element } = {
      "/": <HomeResume />,
      // "/home-resume": <HomeResume />,
      "/keyword-generator": <KeywordGenerator />,
      "/compare-job-resume": <CompareJobResume />,
      "/dashboard-resume": <DashboardResume results={details} />,
      "/summary-job-resume": <SummaryJobResume />,
      "/signup": <Signup />,
    };

    const currentComponent = routeComponentMap[pathname] || (
      <div>Page not found (404)</div>
    );

    
  return (
    <div>
      <UserProvider>
        {currentComponent}
      </UserProvider>
    </div>
  );
}
