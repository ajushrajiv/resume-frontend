"use client"

import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import fetchKeywords  from "../../api/v1/keywords/KeywordsMutations"

function ProcessJobDescription() {
  
  const [ formData, setFormData ] = useState({
    jobDescription: ''
  });
  const [ keywords, setKeywords ] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{        
      //keyword generation
      const generatedKeywords = await fetchKeywords(formData.jobDescription);
      const keywordsString = Array.isArray(generatedKeywords) ? generatedKeywords.join(', ') : generatedKeywords;
    
      // Remove commas and add spaces
      const formattedKeywords = keywordsString.replace(/[",.\/!$%\^&\*;:{}=\`~()]/g, '         ');
      console.log(formattedKeywords);
      
      setKeywords(formattedKeywords);
    }catch(e){
        console.log("Processing failed", e);
    }
  };

  const colors = ["text-lime-700", "text-blue-700", "text-red-700", "text-yellow-700"];

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div>
        <div className=" px-3 mb-6 md:mb-0 flex">
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide text-lime-700 text-base font-light mb-2" >
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
            <label className="block uppercase tracking-wide text-lime-700 text-base font-light mb-2" >
              Generated Keywords
            </label>

            <div
              className=" whitespace-pre-wrap leading-loose block w-full h-96 bg-gray-50 text-lime-700 text-lg tracking-wide border border-gray-500 rounded pt-4 px-12 mb-3 leading-tight focus:outline-none focus:bg-white overflow-auto"
            >
              {keywords}
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center mt-4">
        <Button type="submit" className="bg-lime-700 text-white rounded text-center px-6 py-1">
            <span>Generate keywords </span>
        </Button>  
      </div>
    </form>
  );
}

export default ProcessJobDescription;
