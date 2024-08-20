import api from "../../config/api";

async function fetchComparison(jobDescription: string, resume:string,companyName: string, jobTitle: string){
    const result = await api.post("compare/resumecompare", {jobDescription, resume, companyName, jobTitle})
    console.log("Result from fetch", result.data)
    const { matchPercentage, matchingWords, nonMatchingWords } = result.data;
    return { matchPercentage, matchingWords, nonMatchingWords };
}

export default fetchComparison ;