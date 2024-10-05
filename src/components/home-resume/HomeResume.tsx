"use client";

import React from 'react';
import Image from 'next/image';
import DescriptionCard from '../reusable-components/DescriptionCard';
import BentoGrid from '../bento-grid/BentoGrid';
import dynamic from 'next/dynamic';

const UserCountDisplay = dynamic(() => import('../user-count-display/UserCountDisplay'), { ssr: false });
const TotalHitCounter = dynamic(() => import('../total-hit-counter/TotalHitCounter'), { ssr: false });

function HomeResume() {
  return (
    <div>
      <div className='font-glegoo mt-32'>

       <div className='text-center'>
          <h1 className='inline text-custom-blue text-5xl font-bold leading-10'>
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
              Compare 
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
       </div>

        <div className="flex justify-center items-center pt-20">
          <Image 
            src="/summary.png" 
            alt="Summary" 
            width={900} 
            height={500} 
            quality={80}
            className="rounded-lg shadow-lg border border-r-to-background" 
          />
        </div>

        <div className='flex justify-center items-center mx-72 my-24'>
          <BentoGrid />
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
              imageSrc="/compare.png" 
              alt="dashboard" 
              href="/dashboard-resume"
              highlightedWord="Dashboard"
            />
          </div>  
      </div>

      <div className='font-glegoo flex justify-center'>
        <div className="flex flex-col items-center p-8 m-8 w-1/6 bg-blue-50 border border-gray-200 text-custom-blue rounded-md">
          <h5 className="text-xl font-medium tracking-tight text-gray-900">
            Statistics
          </h5>
          <span className="text-md pb-4 font-light text-gray-900 ">
            compare requests
          </span>
          <div className='text-center pt-4 bg-white w-12 h-16 text-xl font-bold text-center border border-blue-50 rounded-lg shadow-lg'>
            <TotalHitCounter/>
          </div>
        </div>

        <div className="flex flex-col items-center p-8 m-8 w-1/6 bg-blue-50 border border-gray-200 text-custom-blue rounded-md">
          <h5 className="text-xl font-medium tracking-tight text-gray-900">
            Users
          </h5>
          <span className="text-md pb-4 font-light text-gray-900 ">
            active users
          </span>
          <div className='text-center pt-4 bg-white w-12 h-16 text-xl font-bold text-center border border-blue-50 rounded-lg shadow-lg'>
            <UserCountDisplay/>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {

  return {
    props: {
      data: null, 
    },
  };
}
export default HomeResume;
