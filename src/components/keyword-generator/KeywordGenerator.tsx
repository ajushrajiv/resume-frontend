"use client"

import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import fetchKeywords  from "../../api/v1/keywords/KeywordsMutations"
import TextArea from '../reusable-components/TextArea';
import Label from '../reusable-components/Label';
import KeywordDisplay from '../reusable-components/KeywordDisplay';

function KeywordGenerator() {
  
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
      
      setKeywords(formattedKeywords);
    }catch(e){
        console.log("Processing failed", e);
    }
  };

  return (
    <div className='text-center mt-48'>
      <form className="w-full" onSubmit={handleSubmit}>
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
              <Label text='Generated keywords' />
                <KeywordDisplay keywords={keywords}/>
            </div>
          </div>


        <div className="flex justify-center mt-4">
          <Button type="submit" className="bg-custom-blue text-white rounded text-center px-6 py-1">
              <span>Generate keywords </span>
          </Button>  
        </div>
      </form>
    </div>
 );
}

export default KeywordGenerator;