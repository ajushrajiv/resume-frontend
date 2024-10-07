import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { JobDetails } from '@/interfaces/JobDetails';
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import fetchEditJobTitle from '@/api/v1/summary/summary-mutations/FetchEditJobTitleMutation';
import fetchEditResume from '@/api/v1/summary/summary-mutations/FetchEditResumeMutation';
import fetchEditCompanyName from '@/api/v1/summary/summary-mutations/FetchEditCompanyNameMutation';
import fetchsinglejobdetails from '@/api/v1/summary/summary-queries/SummaryQueries';
import { useRouter } from 'next/navigation';
import ConfirmModal from '../reusable-components/ConfirmModal';
import { format } from 'date-fns';
import deleteJobById from '@/api/v1/summary/summary-mutations/DeleteJobById';
import { handleFileChange } from '@/utils/FileHandler';
import * as pdfjsLib from 'pdfjs-dist';
import UploadSummaryButton from '../reusable-components/UploadSummaryButton';
//pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';


function SummaryJobResume() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [editMode, setEditMode] = useState({ 
    companyName: false, 
    jobTitle: false, 
    resume: false
  });
  const [editValues, setEditValues] = useState({ 
    companyName: '', 
    jobTitle: '', 
    resume: '' 
  });

  const [isModalOpen, setModalOpen] = useState(false); 
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resume' | 'jobDescription'>('resume');
  const searchParams = useSearchParams();
  const input_id = searchParams.get('id');
  const id = input_id ? parseInt(input_id, 10) : null; // to avoid type mismatch
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response: AxiosResponse<JobDetails> = await fetchsinglejobdetails(id);
          const data = response.data;
          console.log('Job details:', data);
          setJobDetails(data);
          if (data?.JobApplicationModel) {
            setEditValues({
              companyName: data.JobApplicationModel.companyName || '',
              jobTitle: data.JobApplicationModel.jobTitle || '',
              resume: data.JobApplicationModel.resume || ''
            });
          }          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching job details:', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (field: keyof typeof editValues, value: string) => {
    setEditValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSave = async (field: keyof typeof editValues) => {
    if (id) {
      try {

        if (!editValues[field].trim()) {
          console.error(`${field} cannot be empty`);
          return;
        }

        switch (field) {
          case 'companyName':
            await fetchEditCompanyName(id, editValues.companyName);
            setJobDetails((prevDetails) => 
              prevDetails ? { 
                ...prevDetails, 
                JobApplicationModel: {
                  ...prevDetails.JobApplicationModel,
                  companyName: editValues.companyName 
                }
              } : null
            );
            break;
          case 'jobTitle':
            await fetchEditJobTitle(id, editValues.jobTitle);
            setJobDetails((prevDetails) => 
              prevDetails ? { 
                ...prevDetails, 
                JobApplicationModel: {
                  ...prevDetails.JobApplicationModel,
                  jobTitle: editValues.jobTitle 
                }
              } : null
            );
            break;
          case 'resume':
            await fetchEditResume(id, editValues.resume);
            setJobDetails((prevDetails) => 
              prevDetails ? { 
                ...prevDetails, 
                JobApplicationModel: {
                  ...prevDetails.JobApplicationModel,
                  resume: editValues.resume 
                }
              } : null
            );


            const redirectUrl = `/compare-job-resume?id=${id}&resume=${encodeURIComponent(
              editValues.resume
            )}&jobDescription=${encodeURIComponent(
              jobDetails?.JobApplicationModel.jobDescription || ''
            )}&companyName=${encodeURIComponent(
              jobDetails?.JobApplicationModel.companyName || ''
            )}&jobTitle=${encodeURIComponent(
              jobDetails?.JobApplicationModel.jobTitle || ''
            )}`;
            setRedirectUrl(redirectUrl);
            setModalOpen(true);
            
            break;
        }
        // After saving, exit edit mode
        setEditMode((prevMode) => ({ ...prevMode, [field]: false }));
      } catch (error) {
        console.error(`Error saving ${field}:`, error);
      }
    }
  };

  const handleConfirmRedirect = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
    setModalOpen(false); // Close the modal
  };

  const handleCancelRedirect = () => {
    setModalOpen(false); 
  }

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteJobById(id);
        router.push('/dashboard-resume'); 
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    handleDelete(); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-24 font-glegoo'>
      <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 col-span-1 mb-3 text-gray-900 border rounded-sm p-4">

          <div className="flex flex-col items-center bg-white border border-gray-100 rounded-lg shadow-lg md:flex-row sm:flex-col md:overflow-x-auto  md:max-w-xl">
            <div>
              <div className="relative w-20 h-20 mb-1 ml-2 ">
                <svg className="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle 
                    className="text-gray-200 " 
                    cx="18" 
                    cy="18" 
                    r="15.9155" 
                    stroke-width="4" 
                    stroke="#bfbdbd" 
                    fill="none"
                  >
                  </circle>

                  <circle 
                    className="text-blue-600" 
                    cx="18" 
                    cy="18" 
                    r="15.9155" 
                    stroke-width="4" 
                    stroke={
                      (jobDetails?.matchPercentage ?? 0) < 30 
                        ? "#f472b6" 
                        : (jobDetails?.matchPercentage ?? 0) < 70 
                        ? "#facc15" 
                        : "#22c55e" 
                    } 
                    strokeDasharray={`${jobDetails?.matchPercentage} ${100 - (jobDetails?.matchPercentage ?? 0)}`} 
                    strokeLinecap="round" 
                    fill="none">
                  </circle>
                </svg>
                <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-600 font-medium text-2xl">
                  {jobDetails?.matchPercentage}<div className='text-lg pt-0.5'>%</div>
                </div>
              </div>
            </div>
                        
            <div className="flex flex-col justify-between p-2 leading-normal">
                <p className="mb-3 font-normal text-sm text-gray-700 ">
                {jobDetails?.matchPercentage && jobDetails.matchPercentage > 80
                            ? 'Great! Your resume is a good match for this job.'
                            : 'Increase percentage by adding relevant keywords from the job description'}                </p>
            </div>
          </div>

          <div className='border border-gray-100 rounded-lg mt-4 p-2 '>
            <h6 className="text-lg font-base text-blue-700 mb-1 flex items-center ">
              Company name
              <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, companyName: true }))}>
                <CiEdit className="ml-2" />
              </button>
            </h6>
            {editMode.companyName ? (
              <div>
                <input
                  className="border border-gray-300 outline-none p-2 mb-2"
                  value={editValues.companyName}
                  spellCheck="false"
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
                <button onClick={() => handleSave('companyName')}>
                  <CiSaveUp2 className="ml-2" />
                </button>
              </div>
            ) : (
              <div className="text-base font-light">
                {jobDetails?.JobApplicationModel.companyName || 'N/A'}
              </div>
            )}
          </div>
          
          <div className='border border-gray-100 rounded-lg mt-4 p-2'>
            <h6 className="text-lg font-base text-blue-700 mb-1 flex items-center">
              Job title
              <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, jobTitle: true }))}>
                <CiEdit className="ml-2" />
              </button>
            </h6>
            {editMode.jobTitle ? (
              <div>
                <input
                  className="border border-gray-300 outline-none p-2 mb-2"
                  value={editValues.jobTitle}
                  spellCheck="false"
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                />
                <button onClick={() => handleSave('jobTitle')}>
                  <CiSaveUp2 className="ml-2" />
                </button>
              </div>
            ) : (
              <div className="text-base font-light">
                {jobDetails?.JobApplicationModel.jobTitle}
              </div>
            )}
          </div>
        
          <div className='border border-gray-100 rounded-lg mt-4 p-2 '>
            <h6 className="text-lg font-base text-blue-700 mb-1">
              Comparison date
            </h6>
            <div className="text-base font-light">
              {jobDetails?.JobApplicationModel.matchDate
                ? format(new Date(jobDetails.JobApplicationModel.matchDate), 'MMMM dd, yyyy')
                : 'N/A'
              }
            </div>
          </div>

          <div className='border border-red-400 rounded-lg mt-4 float-right'>
            <button className="text-lg font-light text-red-400 px-4 cursor-pointer" onClick={handleOpenDeleteModal}>
              Delete
            </button>
          </div>
        </div>

        <div className=" lg:col-span-3 col-span-1 mb-3 text-gray-900 border rounded-sm">
          <div className="sm:hidden">
            <select 
              id="tabs" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              onChange={() => setActiveTab('resume')}
            >
              <option>Resume</option>
              <option>Job description</option>
            </select>
          </div>
          <ul className="hidden text-sm font-medium text-center text-gray-600 shadow sm:flex">
            <li className="w-full focus-within:z-10">
              <a 
                href="#" 
                className={`inline-block w-full p-2 text-lg font-base border-r border-gray-50 focus:outline-none ${
                  activeTab === 'resume'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-blue-200'
                }`}
                onClick={() => setActiveTab('resume')}
              >
                Resume
                <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, resume: true }))}>
                  <CiEdit className="ml-2" />
                </button>
              </a>
            </li>
            <li className="w-full focus-within:z-10">
              <a 
                href="#" 
                className={`inline-block w-full p-2 text-lg font-base border-r border-gray-50 focus:outline-none ${
                  activeTab === 'jobDescription'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-blue-200'
                }`}
                onClick={() => setActiveTab('jobDescription')}
              >
                Job description
              </a>
            </li>
          </ul>

          {activeTab === 'resume' && (
            <div className="w-full text-left p-4 h-[360px] overflow-y-auto">
              {editMode.resume ? (
                <div>
                  
                  <textarea
                    className="block p-2.5 w-full h-[240px] text-medium text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    rows={8}
                    value={editValues.resume}
                    spellCheck="false"
                    onChange={(e) => handleInputChange('resume', e.target.value)}
                  />
                   <input 
                      type="file" 
                      accept=".txt,.pdf,.doc,.docx" 
                      onChange={handleFileChange(setEditValues)} 
                      className="hidden" 
                      id="fileInput"
                    />
                  <div className='flex justify-center mt-4 gap-2'>
                    <label htmlFor="fileInput" className=''>
                      <UploadSummaryButton text="Upload CV" />
                    </label>
                    
                    <div className='border border-green-400 rounded-lg  text-lg font-light bg-green-100 text-green-700 px-4'>
                      <button className="flex flex-row" onClick={() => handleSave('resume')}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-medium font-light mb-4">
                  {jobDetails?.JobApplicationModel.resume}
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobDescription' && (
            <div className="w-full text-left p-4 h-[360px] overflow-y-auto">       
              <div className="text-medium font-light mb-4">
                {jobDetails?.JobApplicationModel.jobDescription}
              </div>
            </div>
          )}
        </div>
      </div>
    

      <div className="p-4 ml-4 mr-4 mt-12 bg-pink-50 text-pink-600 shadow-md rounded-lg">
        <h6 className="text-lg text-center font-bold mb-4">
          Boost Your Resume: Add These Keywords!        
        </h6>
        <div className="mb-4">
        {jobDetails?.nonMatchingWords && jobDetails.nonMatchingWords.length > 0 ? (
          jobDetails.nonMatchingWords.map((word, index) => (
            <span 
              key={index} 
              className="inline-block bg-white text-black font-light px-2 py-1 rounded-md mr-2 mb-2"
            >
              {word}
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No keywords to add. Your resume might already align well with the job description!</p>
        )
        }
        </div>
      </div>
        
      <div className="p-4 ml-4 mr-4 mt-12 bg-green-50 text-black shadow-md rounded-lg">
        <h6 className="text-lg text-center font-bold mb-4 text-green-600">
            Great Match: Your Resume Keywords Align Perfectly
        </h6>
        <div className="mb-4">
        {jobDetails?.matchingWords && jobDetails.matchingWords.length > 0 ? (
           jobDetails.matchingWords.map((word, index) => (
            <span 
              key={index} 
              className="inline-block bg-white text-black font-light px-2 py-1 rounded-md mr-2 mb-2"
            >
              {word}
            </span>
          ))
          ) : (
            <p className="text-gray-500 text-sm">No matching keywords found in your resume for this job description.</p>
          )}
        </div>
      
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCancelRedirect}
          onConfirm={handleConfirmRedirect}
          confirmText="Confirm Navigation"
          confirmDescription="Do you want to proceed to the comparison page?"
        />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirmText="Delete Job"
        confirmDescription="Are you sure you want to delete this job? This action cannot be undone."
      />
      
      </div>
    </div>
  );
};

export default SummaryJobResume;
