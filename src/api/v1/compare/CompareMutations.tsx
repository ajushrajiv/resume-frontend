import api from "../../config/api";

async function fetchComparison(jobDescription: string, resume:string){
    const result = await api.post("compare/resumecompare", {jobDescription, resume})
    console.log("Result from fetch", result.data)
    const { matchPercentage, matchingWords, nonMatchingWords } = result.data;
    return { matchPercentage, matchingWords, nonMatchingWords };
}

export default fetchComparison ;