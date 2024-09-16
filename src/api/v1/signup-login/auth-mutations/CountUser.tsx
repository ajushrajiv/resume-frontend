import api from "@/api/config/api";

async function countUser(){
    const result = await api.post("/auth/user-count" );
    console.log("User count",  result.data)
    return result.data;
}

export default countUser;