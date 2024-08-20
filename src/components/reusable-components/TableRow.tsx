"use client";

import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import React from 'react';

const TableRow: React.FC<DescriptionResumeInfo> = ({ 
  jobDescription, 
  resume, 
  companyName, 
  jobTitle, 
  jobStatus, 
  matchDate 
}) => {
  const formattedDate = matchDate ? new Date(matchDate).toLocaleDateString() : 'N/A';

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <tr className="bg-white border-b dark:bg-white dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
            {truncateText(jobDescription,10)}
        </th>
        <td className="px-6 py-4">{truncateText(resume,10)}</td>
        <td className="px-6 py-4">{companyName}</td>
        <td className="px-6 py-4">{jobTitle}</td>
        <td className="px-6 py-4">{jobStatus}</td>
        <td className="px-6 py-4">{formattedDate}</td>
    </tr>
  );
}

export default TableRow;