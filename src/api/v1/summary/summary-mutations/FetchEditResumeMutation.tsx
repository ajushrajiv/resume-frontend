import api from "../../../config/api";

async function fetchEditResume(jobId:number, newResume: string){
    const result = await api.put("summary/editresumebyid", { jobId, newResume })
    return result;
}

export default fetchEditResume;