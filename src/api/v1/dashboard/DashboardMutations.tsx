import api from "../../config/api";

async function fetchupdatestatus( newStatus: string, id: number ){
    const results = await api.put("dashboard/updatejobstatus", { newStatus, id })
    return results;
}

export default fetchupdatestatus ;