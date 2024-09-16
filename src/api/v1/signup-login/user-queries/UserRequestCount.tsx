import api from "@/api/config/api";

async function userRequestCount(){

    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("No token found");
        return null;
    }

    try{
        const result = await api.get("/users/hitcount", {headers:{
        Authorization: `Bearer ${token}`
        }});
    console.log("RESULT userRequestCount",result)
    return result.data;
    }catch(error){
        console.error("Error fetching current user", error);
        return null;
    }  
}

export default  userRequestCount;




