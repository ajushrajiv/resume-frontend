"use client";

import React, { useEffect, useState } from 'react';
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import DashboardResume from "@/components/dashboard-resume/DashboardResume";
import { NextUIProvider } from "@nextui-org/react";
import fetchalldetails from "@/api/v1/dashboard/DashboardQueries";
import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';

export default function DashboardPage() {
  const [details, setDetails] = useState<DescriptionResumeInfo[]>([]);

    useEffect(() => {
        async function getDetails() {
            const response = await fetchalldetails();
            const data = response.data
            setDetails(data);
        }

        getDetails();
    }, []);


  return (
    <NextUIProvider>
      <NavbarResume />
      <DashboardResume results={details}/>
    </NextUIProvider>
  );
}
