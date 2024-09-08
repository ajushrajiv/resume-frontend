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
import mammoth from 'mammoth';
import { Document, Packer, Paragraph } from 'docx';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

function CompareJobResume() {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const resume = searchParams.get('resume');
  const jobDescription = searchParams.get('jobDescription');
  const companyName = searchParams.get('companyName');
  const jobTitle = searchParams.get('jobTitle');

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
    if (resume && jobDescription && companyName) {
      setFormData((prevData) => ({
        ...prevData,
        resume: String(resume),
        jobDescription: String(jobDescription),
        companyName: String(companyName),
        jobTitle: String(jobTitle)
      }));
    }
  }, [resume, jobDescription, companyName, jobTitle, user]); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file type",file?.type)

    if (file) {
      const reader = new FileReader();
      reader.onload = async(event) => {

      if (file.type === 'application/pdf') {
        try{
          const pdfData = new Uint8Array(event.target?.result as ArrayBuffer);

          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

          let textContent = '';

          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContentPage = await page.getTextContent();

            const pageText = textContentPage.items
            .filter((item: any) => typeof item.str === 'string')
            .map((item: any) => item.str)
            .join(' ');

            textContent += pageText + '\n';
          }

          console.log("Text content", textContent)
          
          setFormData((prevData) => ({
            ...prevData,
            resume: textContent
          }));
        }catch (error) {
          console.error('Error extracting text from PDF:', error);
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });

          console.log("Text content", textContent);
          setFormData((prevData) => ({
            ...prevData,
            resume: textContent
          }));
        } catch (error) {
          console.error('Error extracting text from DOCX:', error);
        }
      } 
      else {
        const textData = event.target?.result as string;
        setFormData((prevData) => ({
          ...prevData,
          resume: textData
          }));
        }
    };

    if (file.type === 'application/pdf') {
      reader.readAsArrayBuffer(file); 
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file); 
    }   
   }
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
  <div className='mt-32 flex justify-center'>
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
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h2 className="text-2xl font-semibold text-custom-blue mb-4">Comparison Results</h2>
          <h4 className="text-lg font-semibold text-custom-blue mb-4">Match Percentage:</h4>
          <h6 className="text-md font-semibold text-custom-blue mb-4">{comparisonResult.matchPercentage}%</h6>
          <div>
            <h4 className="text-lg font-semibold text-custom-blue mb-4">Matching Words:</h4>
            <h6 className="text-md font-semibold text-custom-blue mb-4">
                {comparisonResult.matchingWords.map((word, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-pink-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {word}
                  </span>                
                ))}
            </h6>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-custom-blue mb-4">Non-Matching Words:</h4>
            <h6 className="text-md font-semibold text-custom-blue mb-4">
                {comparisonResult.nonMatchingWords.map((word, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-pink-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {word}
                  </span>               
                ))}
            </h6>
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
          </div>

          <div className="w-1/2 px-3">
            <div className='flex justify-between'>
              <Label text='Resume' />

              <input 
                type="file" 
                accept=".txt,.pdf,.doc,.docx" 
                onChange={handleFileChange} 
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
            
          </div>          
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit" className="bg-custom-blue text-white rounded text-center px-6 py-1">
            <span>Compare </span>
        </Button>  
      </div>
    </form>
    </div>
  );
}

export default CompareJobResume;