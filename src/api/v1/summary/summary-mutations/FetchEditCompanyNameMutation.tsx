import api from "../../../config/api";

async function fetchEditCompanyName(jobId:number, newCompanyName: string){
    const result = await api.put("summary/editcompanynamebyid", { jobId, newCompanyName })
    return result;
}

export default fetchEditCompanyName;