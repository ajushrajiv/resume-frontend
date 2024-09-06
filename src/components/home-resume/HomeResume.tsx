"use client";

import React from 'react';
import Image from 'next/image';
import fileanimation from "../../../public/fileanimation.json"
import compareanimation from "../../../public/compareanimation.json"
import dashboardanimation from "../../../public/dashboardanimation.json"
import CardWithAnimation from '../reusable-components/CardWithAnimation';
import DescriptionCard from '../reusable-components/DescriptionCard';

function HomeResume() {
  return (
    <div>
      <div className='text-center mt-32'>

        <h1 className='inline text-custom-blue font-glegoo text-5xl font-bold leading-10'>
          <div className='inline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-to-background pr-3'>
            Analyze
          </div>
          and improve your 
          <div className='inline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-to-background p-3'>
            resume
          </div>
          with ease
        </h1>

        <p className='text-custom-blue mt-4'>
          Effortlessly match job descriptions with your resume. Get instant keyword analysis,<br></br> matching percentages, and a detailed dashboard of all relevant information
        </p>

        <div className='m-12'>
          <a href='/compare-job-resume' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-button-blue focus:outline-none custom dark:hover:bg-button-blue ">
            Compare for free
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>

        <div className="flex justify-center items-center pt-20">
          <Image 
            src="/summary.png" 
            alt="Summary" 
            width={900} 
            height={500} 
            quality={80}
            className="rounded-lg shadow-lg border border-green-500" 
          />
        </div>

        <div className='flex flex-row justify-center gap-4 pt-16 pb-16'> 
          <div className='bg-blue-50'>
            <CardWithAnimation animationData={fileanimation} href="/keyword-generator" text="Extract Essential Keywords from Job Descriptions" />
          </div>
          <div className='bg-gray-50'>
            <CardWithAnimation animationData={compareanimation} href="/compare-job-resume" text="Compare Your Resume with Job Descriptions" />
          </div>
          <div className='bg-green-50'>
            <CardWithAnimation animationData={dashboardanimation} href="/dashboard-resume" text="Track Your Job Search Progress and Organize Resumes" />
          </div>
        </div>
      </div>

        <div className='flex flex-col gap-16'>
           <div className='flex justify-center'>
              <DescriptionCard 
                title="Extract Essential Keywords from Job Descriptions" 
                description="Paste the job description into the text area to instantly extract the most relevant keywords. Use these keywords to enhance your resume and increase your chances of matching the job criteria" 
                buttonText="Keywords from Job description" 
                imageSrc="/keyword.png" 
                alt="keyword" 
                href="/keyword-generator"
                highlightedWord="Keywords"
              />
           </div> 
            <div className='flex justify-center'>
              <DescriptionCard 
                title="Compare Your Resume with Job Descriptions" 
                description="Paste the job description and your resume to see how well they align. Get a detailed match percentage and identify matching and non-matching keywords to refine your resume" 
                buttonText="Compare Job&Resume" 
                imageSrc="/compare.png" 
                alt="compare" 
                href="/compare-job-resume"
                highlightedWord="Compare"
              />
            </div>
            <div className='flex justify-center'>
              <DescriptionCard 
                title="Track Your Job Search Progress and Organize Resumes" 
                description="Easily track your job applications, save job descriptions, and store tailored resumes all in one place." 
                buttonText="Dashboard" 
                imageSrc="/dashboard.png" 
                alt="dashboard" 
                href="/dashboard-resume"
                highlightedWord="Track"
              />
            </div>  
        </div>
    </div>
  );
}

export default HomeResume;
