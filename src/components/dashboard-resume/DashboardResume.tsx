"use client"
import React, { useState, useEffect } from 'react';
import TableHeader from '../reusable-components/TableHeader';
import TableRow from '../reusable-components/TableRow';
import Table from '../reusable-components/Table';
import { DashboardContentProps } from '@/interfaces/DashboardContentProps';
import fetchupdatestatus from '@/api/v1/dashboard/DashboardMutations';

const DashboardResume: React.FC<DashboardContentProps> = ({results}) => {

    const [jobStatus, setJobStatus] = useState<{ [id: number]: string }>({});

    const handleStatusUpdate = async (newStatus: string, id: number) => {
        try {
            const response = await fetchupdatestatus(newStatus, id);
            console.log('Status updated successfully', response.data);
            setJobStatus(prevStatus => ({
                ...prevStatus,
                [id]: newStatus,
            }));       
         } catch (error) {
            console.error('Error updating status', error);
        }
    };

    return(
        <Table>
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-black bg-gray-100 dark:text-black dark:bg-gray-100">
                Application Tracker Dashboard
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Monitor and manage your job application process.Stay organized and keep track of your progress at a glance.   
                </p>
            </caption>
            <TableHeader />
            <tbody>
                
                {results.map((result, index) => (
                    <TableRow 
                        key={index}
                        id={result.id}
                        jobDescription={result.jobDescription}
                        resume={result.resume}
                        companyName={result.companyName}
                        jobTitle={result.jobTitle}
                        jobStatus={jobStatus[result.id] || result.jobStatus}
                        matchDate={result.matchDate}
                        onStatusChange={ handleStatusUpdate }
                    />
                ))}
            </tbody>
        </Table>
    )
}

export default DashboardResume