"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import fetchComparison from '@/api/v1/compare/CompareMutations';

function CompareJobResume() {
  
  const [ formData, setFormData ] = useState({
    jobDescription: '',
    resume:''
  });

  const [comparisonResult, setComparisonResult] = useState<null | {
    matchPercentage: number;
    matchingWords: string[];
    nonMatchingWords: string[];
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{        
      const result = await fetchComparison(formData.jobDescription, formData.resume);
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
                <label className="block uppercase tracking-wide text-custom-blue text-base font-light mb-2" >
                    Job description
                </label>

                <textarea
                    className="appearance-none block w-full h-96 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
                    placeholder="Paste the job description"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                />
            </div>

            <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-custom-blue text-base font-light mb-2" >
                    Resume
                </label>

                <textarea
                    className="appearance-none block w-full h-96 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
                    placeholder="Paste the resume"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
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