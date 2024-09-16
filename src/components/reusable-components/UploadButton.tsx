"use client"

import React from 'react';
import { GoUpload } from "react-icons/go";

function UploadButton({ text }:ResumeButtonProps){

  return(

    <button type="submit" 
            onClick={() => document.getElementById('fileInput')?.click()}
            className="bg-gray-200 text-gray-800 hover:bg-gray-100 font-medium px-4 rounded">
      <div className="flex flex-row">
        {text}<div className='text-lg pt-1 pl-2 text-black'><GoUpload /></div>
      </div>
    </button>
  )
}
export default UploadButton;
