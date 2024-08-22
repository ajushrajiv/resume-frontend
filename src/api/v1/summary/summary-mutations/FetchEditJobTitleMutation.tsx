import api from "../../../config/api";

async function fetchEditJobTitle(jobId:number, newJobTitle: string){
    const result = await api.put("summary/editjobtitlebyid", { jobId, newJobTitle })
    return result;
}


export default fetchEditJobTitle;