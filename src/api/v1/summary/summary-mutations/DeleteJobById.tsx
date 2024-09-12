import api from "../../../config/api";

async function deleteJobById(jobId:number){
    const result = await api.delete("summary/deletejobbyid", { params:{ jobId }} )
    return result;
}

export default deleteJobById;