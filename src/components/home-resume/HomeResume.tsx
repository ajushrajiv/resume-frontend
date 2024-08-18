"use client"

import React, { useState } from 'react';

function HomeResume(){

    return(
        <div className='mt-12 ml-24 mr-24 flex items-center justify-center'>
        <div role="status" className="w-3/4 space-y-4 border-gray-100 divide-y divide-gray-100 rounded shadow dark:divide-gray-100 md:p-6 dark:border-gray-100">
            <div className="flex items-center justify-between">
                <div className="w-full p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-white dark:border-gray-100">
                    <a href="/keyword-generator">
                        <h5 className="mb-2 text-lg font-medium tracking-tight text-title-blue dark:text-title-blue">
                            Extract Essential Keywords from Job Descriptions
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Paste the job description into the text area to instantly extract the most relevant keywords.
                        Use these keywords to enhance your resume and increase your chances of matching the job criteria.
                    </p>
                    <div className='flex justify-end'>
                        <a href="/keyword-generator" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-button-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Keywords from Job description
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="w-full p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-white dark:border-gray-100">
                    <a href="/compare-job-resume">
                        <h5 className="mb-2 text-lg font-medium tracking-tight text-title-blue dark:text-title-blue">
                            Match Your Resume with Job Descriptions  
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Paste the job description and your resume to see how well they align.
                        Get a detailed match percentage and identify matching and non-matching keywords to refine your resume.
                    </p>
                    <div className='flex justify-end'>
                        <a href="/compare-job-resume" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-button-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Compare Job&Resume
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="w-full p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-white dark:border-gray-100">
                    <a href="/dashboard-resume">
                        <h5 className="mb-2 text-lg font-medium tracking-tight text-title-blue dark:text-title-blue">
                            Track Your Job Search Progress and Organize Resumes
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Easily track your job applications, save job descriptions, and store tailored resumes all in one place.                 
                   </p>
                    <div className='flex justify-end'>
                        <a href="/dashboard-resume" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-button-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Dashboard
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default HomeResume