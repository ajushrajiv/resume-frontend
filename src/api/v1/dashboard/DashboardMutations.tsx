import api from "../../config/api";

async function fetchupdatestatus( newStatus: string, id: number ){
    const results = await api.put("dashboard/updatejobstatus", { newStatus, id })
    console.log("Result from fetch Dashboard Update status", results.data)
    return results;
}

export default fetchupdatestatus ;