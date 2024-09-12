"use client"

import React from 'react';
import { useRouter } from 'next/navigation';


const ResumeButton: React.FC<ResumeButtonProps> = ({ text }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return(

    <button type="submit" 
            className="bg-custom-blue hover:bg-button-blue text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}>
      {text}
    </button>
  )
}
export default ResumeButton;
