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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(keywords);
  };

  const downloadKeywords = () => {
    const element = document.createElement("a");
    const file = new Blob([keywords], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "keywords.txt";
    document.body.appendChild(element); 
    element.click();
  };

  const clearContent = () => {
    setFormData({ jobDescription: '' });
    setKeywords('');
  };

  return (
    <div className='mt-32 font-glegoo flex justify-center'>
      
      <form className="w-4/6 " onSubmit={handleSubmit}>
        <div>
          <h4 className='text-custom-blue font-glegoo font-bold text-4xl leading-7'>
            Keyword extraction
          </h4>
          <p className='text-custom-blue pt-4 text-base'>
            Paste text, such as a job description or an article. 
            The tool analyses the text to find the most relevant words.
            It gives you a list of these important words as an output.
          </p>
        </div>
        {keywords && (
          <div className="pt-12 pb-8">
            <Label text='Generated keywords' />
            <KeywordDisplay keywords={keywords}/>
            <div className='pt-2 flex justify-end gap-2'>
              <Button 
                onClick={copyToClipboard} 
                className="bg-blue-200 text-blue-800 rounded text-center px-6 py-1"
              >
                Copy Keywords
              </Button>

              <Button 
                onClick={downloadKeywords} 
                className="bg-green-200 text-green-800 rounded text-center px-6 py-1"
              >
                Download Keywords
              </Button>

              <Button 
                onClick={clearContent} 
                className="bg-red-200 text-red-800 rounded text-center px-6 py-1"
              >
                Clear
              </Button>
            </div>
            
          </div>
        )}

        <div className="pt-16">
          <Label text='Job description' />
          <TextArea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Paste the job description"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Button type="submit" className="bg-custom-blue text-white rounded text-center px-6 py-1">
              <span>Generate keywords </span>
          </Button>  
        </div>
      </form>
    </div>
 );
}

export default KeywordGenerator;