"use client";

import React, { useEffect, useState, useContext } from 'react';
import DashboardResume from "@/components/dashboard-resume/DashboardResume";
import { NextUIProvider } from "@nextui-org/react";
import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import UserContext from '@/contexts/UserContext';
import fetchdetailsbyuserid from '@/api/v1/dashboard/DashboardQueries';

export default function DashboardPage() {
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


  return (
    <NextUIProvider>
      <DashboardResume results={details}/>
    </NextUIProvider>
  );
}
