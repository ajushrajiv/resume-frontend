"use client";

import { DescriptionResumeInfo } from '@/interfaces/DescriptionResumeInfoProps';
import React from 'react';

const TableRow: React.FC<DescriptionResumeInfo & { onStatusChange: (newStatus: string, id:number) => void }> = ({ 
  id,
  jobDescription, 
  resume, 
  companyName, 
  jobTitle, 
  jobStatus, 
  matchDate,
  onStatusChange,
  onJobDescriptionClick
}) => {
  const formattedDate = matchDate ? new Date(matchDate).toLocaleDateString() : 'N/A';

  // Function to truncate text
  const truncateText= (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value, id);
  };

  const jobStatusOptions = ['status','Applied', 'Interviewing', 'Offered', 'Rejected'];

  return (
    <tr className="bg-white border-b dark:bg-white dark:border-gray-700">
          <th 
            scope="row" 
            onClick={() => onJobDescriptionClick(id)} 
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black underline decoration-1 cursor-pointer">
              {truncateText(jobDescription, 15)}
          </th>
        <td className="px-6 py-4">{truncateText(resume, 15)}</td>
        <td className="px-6 py-4">{truncateText(companyName, 15)}</td>
        <td className="px-6 py-4">{truncateText(jobTitle, 15)}</td>
        <td className="px-6 py-4">
          <select defaultValue={jobStatus} onChange={handleStatusChange}>
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