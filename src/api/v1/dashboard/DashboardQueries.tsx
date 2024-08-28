import api from "../../config/api";

async function fetchdetailsbyuserid(userId: number){
    const results = await api.get(`dashboard/allresults?`, { params: {userId}})
    return results;
}

export default fetchdetailsbyuserid ;

