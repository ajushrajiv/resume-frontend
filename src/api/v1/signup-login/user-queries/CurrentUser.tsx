import api from "@/api/config/api";

async function currentUser(){
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("No token found");
        return null;
    }

    try{
        const result = await api.get("/users/currentuser",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log("RESULT CURRENTUSER",result)
        return result.data;
    }catch(error){
        console.error("Error fetching current user", error);
        return null;
    }    
}

export default  currentUser;