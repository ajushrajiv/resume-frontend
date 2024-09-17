"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TableHeader from '../reusable-components/TableHeader';
import TableRow from '../reusable-components/TableRow';
import Table from '../reusable-components/Table';
import { DashboardContentProps } from '@/interfaces/DashboardContentProps';
import fetchupdatestatus from '@/api/v1/dashboard/DashboardMutations';

function DashboardResume({results}:DashboardContentProps){

    const safeResults = Array.isArray(results) ? results : [];
    console.log("DASHBOARD RESUME", safeResults);


    const [jobStatus, setJobStatus] = useState<{ [id: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1); 
    const rowsPerPage = 10;
    const router = useRouter();

    const filteredResults = results.filter(result =>
        result.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const reversedResults = [...filteredResults].reverse();

    const totalPages = Math.ceil(results.length / rowsPerPage);

    const paginatedResults = reversedResults.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

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

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleJobDescriptionClick = (id: number) => {
        router.push(`/summary-job-resume?id=${id}`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    return(
    <div className='m-24 font-glegoo' >  
        <div className='flex justify-between'>
            <form className="w-2/6">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <input type="search" 
                        id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
                        placeholder="Search by company name" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required 
                    />
                    <button 
                        type="submit" 
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
                            Search
                    </button>
                </div>
            </form>

            <div className="pagination flex items-center space-x-1">
                <button
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1} 
                >
                    Prev
                </button>
                <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages} 
                >
                    Next
                </button>
            </div>

        </div>

        <Table>
            <caption className="p-5 mt-4 text-lg font-semibold text-left rtl:text-right text-black bg-gray-100 dark:text-black dark:bg-gray-100">
                Application Tracker Dashboard
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Monitor and manage your job application process.Stay organized and keep track of your progress at a glance.   
                </p>
            </caption>
            <TableHeader />
            <tbody>
                {paginatedResults.map((result, index) => (
                    <TableRow 
                        key={index}
                        id={result.id}
                        jobDescription={result.jobDescription}
                        resume={result.resume}
                        companyName={result.companyName}
                        jobTitle={result.jobTitle}
                        jobStatus={jobStatus[result.id] || result.jobStatus}
                        matchDate={result.matchDate}
                        isDeleted={result.isDeleted}
                        onStatusChange={ handleStatusUpdate }
                        onJobDescriptionClick={() => handleJobDescriptionClick(result.id)}
                    />
                ))}
            </tbody>
        </Table>
    </div>
    )
}

export default DashboardResume