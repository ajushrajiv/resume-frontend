import { JobApplicationModel } from "./JobApplicationModel";

  
export interface JobDetails {
  JobApplicationModel: JobApplicationModel;
  createdAt: string;
  id: number;
  jobApplicationId: number;
  matchPercentage: number;
  matchingWords: string[];
  nonMatchingWords: string[];
  updatedAt: string;
}
