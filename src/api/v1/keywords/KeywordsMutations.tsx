import api from "../../config/api";

async function fetchKeywords(jobDescription: string){
    const result = await api.post("generate-keyword/displayKeyWords", {jobDescription})
    console.log("Result from fetch", result.data.jobEntities)
    const keywords = result.data.jobEntities
    return keywords;
}

export default fetchKeywords ;