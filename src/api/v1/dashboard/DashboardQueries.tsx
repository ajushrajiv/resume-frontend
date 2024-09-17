import api from "../../config/api";

async function fetchdetailsbyuserid(userId: number){
    const results = await api.get(`dashboard/allresults?`, { params: {userId}})
    const filteredData = results.data.filter((item: { isDeleted: boolean }) => !item.isDeleted);
     console.log("Filtered data:", filteredData);
    return filteredData;
}

export default fetchdetailsbyuserid ;

