import api from "../../config/api";

async function fetchalldetails(){
    const results = await api.get("dashboard/allresults")
    console.log("Result from fetch Dashboard", results.data)
    return results;
}

export default fetchalldetails ;