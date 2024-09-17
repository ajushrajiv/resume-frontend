import api from "../../../config/api";

async function fetchsinglejobdetails(jobId: number){
    const results = await api.get(`summary/jobinfobysummaryid`, { params: { jobId } })
    console.log("RES...",results)
    return results;
}

export default fetchsinglejobdetails ;