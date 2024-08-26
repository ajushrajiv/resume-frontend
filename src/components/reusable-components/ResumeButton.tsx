"use client"

import React from 'react';
import Link from 'next/link';

const ResumeButton: React.FC<ResumeButtonProps> = ({ text }) => {

  return(

    <button type="submit" 
            className="bg-custom-blue hover:bg-button-blue text-white font-bold py-2 px-4 rounded">
      {text}
    </button>
  )
}
export default ResumeButton;
