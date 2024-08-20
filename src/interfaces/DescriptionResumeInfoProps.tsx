 export interface DescriptionResumeInfo {
  id:number;
  jobDescription: string;
  resume: string;
  companyName: string;
  jobTitle: string;
  jobStatus: string;
  matchDate: Date;
  onStatusChange: (newStatus: string,id: number) => void;
}