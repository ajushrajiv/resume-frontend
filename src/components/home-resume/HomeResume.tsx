"use client";

import React from 'react';
import HomeResumeCard from '../reusable-components/HomeResumeCard';

function HomeResume() {
  return (
    <div className='mt-12 ml-24 mr-24 flex items-center justify-center '>
      <div role="status" className=" bg-gradient-to-r from-from-background to-to-background w-3/4 space-y-4 border-gray-100 rounded shadow dark:divide-gray-100 md:p-6 dark:border-gray-100">
        <div className="flex items-center justify-between">
          <HomeResumeCard
            href="/keyword-generator"
            title="Extract Essential Keywords from Job Descriptions"
            description="Paste the job description into the text area to instantly extract the most relevant keywords. Use these keywords to enhance your resume and increase your chances of matching the job criteria."
            buttonText="Keywords from Job description"
          />
        </div>
        <div className="flex items-center justify-between pt-4">
          <HomeResumeCard
            href="/compare-job-resume"
            title="Match Your Resume with Job Descriptions"
            description="Paste the job description and your resume to see how well they align. Get a detailed match percentage and identify matching and non-matching keywords to refine your resume."
            buttonText="Compare Job&Resume"
          />
        </div>
        <div className="flex items-center justify-between pt-4">
          <HomeResumeCard
            href="/dashboard-resume"
            title="Track Your Job Search Progress and Organize Resumes"
            description="Easily track your job applications, save job descriptions, and store tailored resumes all in one place."
            buttonText="Dashboard"
          />
        </div>

        <div className="flex justify-center mt-4">
        <a className='text-custom-blue text-lg' href="/profile">Profile</a>
      </div>
      
      </div>
    </div>
  );
}

export default HomeResume;
