import api from "../../../config/api";

async function deleteUserById(userId:number){
    const result = await api.delete("auth/deleteuserbyid", { params:{ userId }} )
    return result;
}

export default deleteUserById;