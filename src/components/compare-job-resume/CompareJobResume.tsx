"use client"

import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import fetchComparison from '@/api/v1/compare/CompareMutations';
import Label from '../reusable-components/Label';
import TextArea from '../reusable-components/TextArea';
import InputComponent from '../reusable-components/InputComponent';

function CompareJobResume() {
  
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{        
      const result = await fetchComparison(formData.jobDescription, formData.resume,formData.companyName, formData.jobTitle);
      setComparisonResult(result);

    }catch(e){
        console.log("Processing failed", e);
    }
  };

  return (
  <div>
    <form className="w-full" onSubmit={handleSubmit}>
    <div>
        <div className=" px-3 mb-6 mt-24 md:mt-12 md:mb-0 flex">
            <div className="w-1/2 px-3">
              <Label text='Company Name' />
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
        <div className=" px-3 mb-6 mt-24 md:mt-12 md:mb-0 flex">
            <div className="w-1/2 px-3">
            <Label text='Job description' />
            <TextArea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Paste the job description"
            />
            </div>

            <div className="w-1/2 px-3">
              <Label text='Resume' />
              <TextArea
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Paste the resume"
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

    {/* Conditionally Render the Comparison Results */}
    {comparisonResult && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h2 className="text-2xl font-semibold text-custom-blue mb-4">Comparison Results</h2>
          <h4 className="text-lg font-semibold text-custom-blue mb-4">Match Percentage:</h4>
          <h6 className="text-md font-semibold text-custom-blue mb-4">{comparisonResult.matchPercentage}%</h6>
          <div>
            <h4 className="text-lg font-semibold text-custom-blue mb-4">Matching Words:</h4>
            <h6 className="text-md font-semibold text-custom-blue mb-4">
                {comparisonResult.matchingWords.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </h6>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-custom-blue mb-4">Non-Matching Words:</h4>
            <h6 className="text-md font-semibold text-custom-blue mb-4">
                {comparisonResult.nonMatchingWords.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareJobResume;