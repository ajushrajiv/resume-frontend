"use client"

import React from 'react';

const UploadSummaryButton: React.FC<ResumeButtonProps> = ({ text }) => {

  return(

    <button type="submit" 
            onClick={() => document.getElementById('fileInput')?.click()}
            className="bg-blue-100 text-blue-800 hover:bg-blue-50 border border-blue-500 text-lg font-light px-4 rounded-lg">
        {text}
    </button>
  )
}
export default UploadSummaryButton;
