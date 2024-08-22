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

const SummaryJobResume: React.FC = () => {

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

  const searchParams = useSearchParams();
  const input_id = searchParams.get('id');
  const id = input_id ? parseInt(input_id, 10) : null; // to avoid type mismatch

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response: AxiosResponse<JobDetails> = await fetchsinglejobdetails(id);
          const data = response.data;
          console.log('Job details:', data);
          setJobDetails(data);
          setEditValues({
            companyName: data.JobApplicationModel.companyName,
            jobTitle: data.JobApplicationModel.jobTitle,
            resume: data.JobApplicationModel.resume
          });
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

            // router.push(
            //   `/compare-job-resume?id=${id}&resume=${encodeURIComponent(editValues.resume)}&jobDescription=${encodeURIComponent(jobDetails?.JobApplicationModel.jobDescription || '')}`
            // );

            const redirectUrl = `/compare-job-resume?id=${id}&resume=${encodeURIComponent(
              editValues.resume
            )}&jobDescription=${encodeURIComponent(
              jobDetails?.JobApplicationModel.jobDescription || ''
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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 bg-white text-custom-blue shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Job Details for ID: {id}</h1>
      <h6 className="text-2xl font-bold mb-4">Job Description</h6>
      <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.jobDescription}</div>

      <h6 className="text-2xl font-bold mb-4">Company name</h6>
      {editMode.companyName ? (
        <div>
          <input
            className="border p-2 mb-2"
            value={editValues.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
          <button onClick={() => handleSave('companyName')}>
          <CiSaveUp2 />
          </button>
        </div>
      ) : (
        <div className="text-lg font-bold mb-4">
          {jobDetails?.JobApplicationModel.companyName}
          <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, companyName: true }))}>
            <CiEdit />
          </button>
        </div>
      )}

      <h6 className="text-2xl font-bold mb-4">Resume</h6>
      {editMode.resume ? (
        <div>
          <textarea
            className="border p-2 mb-2 w-full"
            value={editValues.resume}
            onChange={(e) => handleInputChange('resume', e.target.value)}
          />
          <button onClick={() => handleSave('resume')}>
            <CiSaveUp2 />
          </button>
        </div>
      ) : (
        <div className="text-lg font-bold mb-4">
          {jobDetails?.JobApplicationModel.resume}
          <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, resume: true }))}>
            <CiEdit />
          </button>
        </div>
      )}

      <h6 className="text-2xl font-bold mb-4">Job title</h6>
      {editMode.jobTitle ? (
        <div>
          <input
            className="border p-2 mb-2"
            value={editValues.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />
          <button onClick={() => handleSave('jobTitle')}>
            <CiSaveUp2 />
          </button>
        </div>
      ) : (
        <div className="text-lg font-bold mb-4">
          {jobDetails?.JobApplicationModel.jobTitle}
          <button onClick={() => setEditMode((prevMode) => ({ ...prevMode, jobTitle: true }))}>
            <CiEdit />
          </button>
        </div>
      )}

      <h6 className="text-2xl font-bold mb-4">Comparison date</h6>
      <div className="text-lg font-bold mb-4">{jobDetails?.JobApplicationModel.matchDate}</div>

      <h6 className="text-2xl font-bold mb-4">Match Percentage</h6>
      <div className="text-lg font-bold mb-4">{jobDetails?.matchPercentage}%</div>

      <h6 className="text-2xl font-bold mb-4">Matching Words</h6>
      <div className="text-lg font-bold mb-4">{jobDetails?.matchingWords}</div>

      <h6 className="text-2xl font-bold mb-4">Non-matching words</h6>
      <div className="text-lg font-bold mb-4">{jobDetails?.nonMatchingWords}</div>
    
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancelRedirect}
        onConfirm={handleConfirmRedirect}
      />
    
    </div>
  );
};

export default SummaryJobResume;
