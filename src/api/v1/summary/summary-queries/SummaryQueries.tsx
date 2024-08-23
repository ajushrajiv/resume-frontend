import api from "../../../config/api";

async function fetchsinglejobdetails(jobId: number){
    const results = await api.get(`summary/jobinfobysummaryid`, { params: { jobId } })
    return results;
}

export default fetchsinglejobdetails ;