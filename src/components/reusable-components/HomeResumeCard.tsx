"use client";

import React from 'react';

const HomeResumeCard: React.FC<HomeResumeCardProps> = ({ href, title, description, buttonText }) => {
  return (
    <div className="max-w-lg max-h-96	p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-white dark:border-gray-100">
      <a href={href}>
        <h5 className="mb-2 text-lg font-medium tracking-tight text-title-blue dark:text-title-blue">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <div className='flex justify-end '>
        <a href={href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-button-blue focus:outline-none custom dark:hover:bg-button-blue ">
          {buttonText}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default HomeResumeCard;
