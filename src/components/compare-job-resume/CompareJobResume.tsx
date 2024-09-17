"use client"

import React, { useState, useEffect, useContext } from 'react';
import { Button } from "@nextui-org/react";
import fetchComparison from '@/api/v1/compare/CompareMutations';
import InputComponent from '../reusable-components/InputComponent';
import { useSearchParams } from 'next/navigation'
import UserContext from '@/contexts/UserContext';
import CompareTextArea from '../reusable-components/CompareTextArea';
import Label from '../reusable-components/Label';
import UploadButton from '../reusable-components/UploadButton';
import * as pdfjsLib from 'pdfjs-dist';
import { handleFileChange } from '@/utils/FileHandler';
import LoginModal from '../reusable-components/LoginModal';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

function CompareJobResume() {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const resume = searchParams.get('resume');
  const jobDescription = searchParams.get('jobDescription');
  const companyName = searchParams.get('companyName');
  const jobTitle = searchParams.get('jobTitle');

  const [isModalOpen, setModalOpen] = useState(false);
  const [ formData, setFormData ] = useState({
    jobDescription: '',
    resume:'',
    companyName:'',
    jobTitle:''
    });

  const [comparisonResult, setComparisonResult] = useState<null | {
    matchPercentage: number;
    matchingWords: string[];
    nonMatchingWords: string[];
  }>(null);

  const [errors, setErrors] = useState({
    jobDescription: '',
    resume: ''
  });

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is undefined, make sure NavbarResume is wrapped in a UserProvider");
  }

  const { user } = userContext;

  useEffect(() => {
    console.log("user",user)
    console.log("Resume:", resume);
    console.log("Job Description:", jobDescription);
    console.log("Company Name:", companyName);
    console.log("Job Title:", jobTitle);

    // Set form data when component mounts and URL params are available
    if (resume || jobDescription || companyName || jobTitle) {
      setFormData((prevData) => ({
        ...prevData,
        resume: resume ?? prevData.resume,
        jobDescription: jobDescription ?? prevData.jobDescription,
        companyName: companyName ?? prevData.companyName,
        jobTitle: jobTitle ?? prevData.jobTitle
      }));
    }
  }, [resume, jobDescription, companyName, jobTitle, user]); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [activeTab, setActiveTab] = useState<'resume' | 'jobDescription'>('resume');

  const validateForm = () => {
    let valid = true;
    const newErrors = { jobDescription: '', resume: '' };

    if (!formData.jobDescription) {
      newErrors.jobDescription = 'Job description cannot be empty.';
      valid = false;
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume cannot be empty.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setModalOpen(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try{        
      if(user){
        const result = await fetchComparison(
          formData.jobDescription, 
          formData.resume,
          formData.companyName, 
          formData.jobTitle,
          user.id
        );
        setComparisonResult(result);
      }else{
        console.log("User not logged in");
      }
    }catch(e){
        console.log("Processing failed", e);
    }
  };

  const highlightMatchingWords = (text: string, matchingWords: string[]) => {
    const regex = new RegExp(`\\b(${matchingWords.join('|')})\\b`, 'gi');
    const highlightedText = text.replace(regex, (match) => `<mark class="bg-highlight-match text-green-800 font-medium">${match}</mark>`);
  
    return highlightedText;
  };

  const highlightNonMatchingWords = (text: string, nonMatchingWords: string[]) => {
    const regex = new RegExp(`\\b(${nonMatchingWords.join('|')})\\b`, 'gi');
    const highlightedText = text.replace(regex, (match) => `<mark class="bg-pink-200 text-pink-800 font-medium">${match}</mark>`);
  
    return highlightedText;
  };

  return (
  <div className='mt-32 flex justify-center font-glegoo'>
    <form className="w-4/6" onSubmit={handleSubmit}>
      <div>
        <h4 className='text-custom-blue font-glegoo font-bold text-4xl leading-7'>
          Compare Job description and Resume
        </h4>
        <p className='text-custom-blue pt-4 text-base'>
          Compares job descriptions with the resumes to calculate a match percentage, highlights matching keywords and phrases, and points out any missing ones to help you identify skills gaps.
        </p>
      </div>

      {comparisonResult && (
        <div>
          <div className='flex justify-end'>
            <a href="/dashboard-resume" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-button-blue focus:outline-none custom dark:hover:bg-button-blue">
              Dashboard
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>

          <div className="mt-8 p-4 border border-gray-300 rounded">
                  
          <div className="flex flex-col sm:flex-row items-center justify-between">

            <div className="sm:hidden mb-4">
              <select 
                id="tabs" 
                className="bg-gray-50 border border-gray-300 text-custom-blue text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={() => setActiveTab('resume')}
              >
                  <option>Resume matches</option>
                  <option>Suggested additions</option>
              </select>
            </div>

            <ul className="flex flex-wrap text-sm font-normal text-center text-gray-500 bg-gray-100 rounded-full p-1">
              <li className="flex-1 focus-within:z-10">
                  <a 
                    href="#" 
                    className={`inline-block w-full h-full p-2 ${activeTab === 'resume' ? 'text-white bg-green-400' : 'text-gray-700 bg-gray-100'} rounded-full active focus:outline-none`} 
                    onClick={() => setActiveTab('resume')}
                  >
                    Matches
                  </a>
              </li>

              <li className="flex-1 focus-within:z-10">
                <a 
                  href="#" 
                  className={`inline-block w-full p-2 ${activeTab === 'jobDescription' ? 'text-white bg-pink-500' : 'text-gray-700 bg-gray-100'} rounded-full active focus:outline-none`} 
                  onClick={() => setActiveTab('jobDescription')}
                >
                  Suggestions
                </a>
              </li>
            </ul>
            <div className='border border-gray-300 rounded-lg'>
              <div className='text-black text-sm bg-gray-200 mb-1 pl-1 pr-1'>
                Match %
              </div>
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                
                <div className="relative w-14 h-14 mb-1 ml-2">
                  <svg className="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle 
                      className="text-gray-200 " 
                      cx="18" 
                      cy="18" 
                      r="15.9155" 
                      stroke-width="4" 
                      stroke="#bfbdbd" 
                      fill="none"
                    >
                    </circle>

                    <circle 
                      className="text-blue-600" 
                      cx="18" 
                      cy="18" 
                      r="15.9155" 
                      stroke-width="4" 
                      stroke={
                        comparisonResult.matchPercentage < 30 
                          ? "#f472b6" 
                          : comparisonResult.matchPercentage < 70 
                          ? "#facc15" 
                          : "#22c55e" 
                      } 
                      strokeDasharray={`${comparisonResult.matchPercentage} ${100 - comparisonResult.matchPercentage}`} 
                      strokeLinecap="round" 
                      fill="none">
                    </circle>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-600 font-medium text-lg">
                    {comparisonResult.matchPercentage}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full p-4 border border-gray-300 rounded-lg mt-4 bg-white">
            {activeTab === 'resume' && (
              <div className="w-full text-left">
                <h4 className="text-md font-light text-blue-400 mb-4">
                  Highlights the key words and phrases in your resume that align with the job description.               
                </h4>
                <div 
                  className="w-full bg-white p-4 rounded bg-gray-50 text-gray-500 text-left" 
                  dangerouslySetInnerHTML={{ __html: highlightMatchingWords(formData.resume, comparisonResult.matchingWords) }}
                />
              </div>
            )}

            {activeTab === 'jobDescription' && (
              <div className="w-full text-left">
                <h4 className="text-md font-light text-blue-400 mb-4">
                    Shows words to consider including in your resume to better meet the job requirements and increase relevance.   
                </h4>          
                <div 
                  className="w-full bg-white p-4 rounded bg-gray-50 text-gray-500 text-left" 
                  dangerouslySetInnerHTML={{ __html: highlightNonMatchingWords(formData.jobDescription, comparisonResult.nonMatchingWords) }}
                />
              </div>
            )}
          </div>
        </div>  
      </div>               
    )}

      <div>
        <div className=" px-3 mb-6 mt-24 md:mt-12 md:mb-0 flex">
            <div className="w-1/2 px-3">
              <Label text='Company name' />
              <InputComponent 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder='Company name' /> 
            </div>

            <div className="w-1/2 px-3">
              <Label text='Job title' />
              <InputComponent 
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder='Job title' /> 
            </div>          
        </div>
      </div>

      <div>
        <div className=" px-3 mb-6 mt-4 md:mt-2 md:mb-0 flex">
          <div className="w-1/2 px-3">
            <Label text='Job description' />
            <CompareTextArea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Paste the job description"
            />
           {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
          </div>

          <div className="w-1/2 px-3">
            <div className='flex justify-between'>
              <Label text='Resume' />

              <input 
                type="file" 
                accept=".txt,.pdf,.doc,.docx" 
                onChange={handleFileChange(setFormData)} 
                className="hidden" 
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <UploadButton text="Upload CV" />
              </label>
            </div>

            <CompareTextArea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              placeholder="upload (.txt or .pdf file) or paste the resume"
            />
           {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
          </div>          
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit" className="bg-custom-blue text-white rounded text-center px-6 py-1">
            <span>Compare </span>
        </Button>  
        
      </div>
      <LoginModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          confirmText="Please login to compare"
        />
    </form>
    </div>
  );
}

export default CompareJobResume;