"use client";

import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import React from 'react';
import { CiEdit, CiSaveUp2 } from "react-icons/ci";

function TableRow({ 
  id,
  jobDescription, 
  resume, 
  companyName, 
  jobTitle, 
  jobStatus, 
  matchDate,
  isDeleted,
  onStatusChange,
  onJobDescriptionClick
}:DescriptionResumeInfo & { onStatusChange: (newStatus: string, id:number) => void }) {
  const formattedDate = matchDate ? new Date(matchDate).toLocaleDateString() : 'N/A';

  const truncateText= (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value, id);
  };

  const jobStatusOptions = ['status','Applied', 'Interviewing', 'Offered', 'Rejected'];

  const statusColorMap: { [key: string]: string } = {
    Applied: 'text-blue-700',      
    Interviewing: 'text-yellow-500', 
    Offered: 'text-green-500',    
    Rejected: 'text-red-600'      
  };

  return (
    <tr className="bg-white border-b border-gray-200">
        <th 
          scope="row" 
          onClick={() => onJobDescriptionClick(id)} 
          className=" flex px-6 py-4 font-medium text-base text-blue-500 whitespace-nowrap underline decoration-1 cursor-pointer">
                      <CiEdit className="ml-2 text-2xl" />
                      {truncateText(jobDescription, 15)}
        </th>
        <td className="px-6 py-4">{truncateText(resume, 15)}</td>
        <td className="px-6 py-4">{truncateText(companyName, 15)}</td>
        <td className="px-6 py-4">{truncateText(jobTitle, 15)}</td>
        <td className={`px-6 py-4 ${statusColorMap[jobStatus] || ''}`}>
          <select
            value={jobStatus}
            onChange={handleStatusChange}
            className="p-2 rounded border"
          >
            {jobStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </td>
        <td className="px-6 py-4">{formattedDate}</td>
    </tr>
  );
}

export default TableRow;