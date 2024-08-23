import api from "../../config/api";

async function fetchalldetails(){
    const results = await api.get("dashboard/allresults")
    return results;
}

export default fetchalldetails ;