 export interface DescriptionResumeInfo {
  id:number;
  jobDescription: string;
  resume: string;
  companyName: string;
  jobTitle: string;
  jobStatus: string;
  matchDate: Date;
  isDeleted: boolean | number;
  onStatusChange: ( newStatus: string,id: number ) => void;
  onJobDescriptionClick: ( id: number ) => void;
}