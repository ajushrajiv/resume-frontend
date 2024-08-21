"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchsinglejobdetails from '@/api/v1/summary/SummaryQueries';
import { AxiosResponse } from 'axios';
import { JobDetails } from '@/interfaces/JobDetails';

const SummaryJobResume: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const searchParams = useSearchParams();
  const input_id = searchParams.get('id');
  const id = input_id ? parseInt(input_id, 10) : null; //to avoid type mismatch

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response: AxiosResponse<JobDetails> = await fetchsinglejobdetails(id);
          const data = response.data
          console.log('Job details:', data);
          setJobDetails(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching job details:', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-5 bg-white  text-custom-blue shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Job Details for ID: {id}</h1>
      <h6 className="text-2xl font-bold mb-4">Job Description</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.jobDescription}</div>
    
        <h6 className="text-2xl font-bold mb-4">Company name</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.companyName}</div>

        <h6 className="text-2xl font-bold mb-4">Resume</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.resume}</div>

        <h6 className="text-2xl font-bold mb-4">Job title</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.jobTitle}</div>

        <h6 className="text-2xl font-bold mb-4">Match Percentage</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.matchPercentage}%</div>

        <h6 className="text-2xl font-bold mb-4">Matching Words</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.matchingWords}</div>

        <h6 className="text-2xl font-bold mb-4">Non-matching words</h6>
        <div className="text-lg font-bold mb-4">{jobDetails?.nonMatchingWords}</div>
    </div>
  );
};

export default SummaryJobResume;
