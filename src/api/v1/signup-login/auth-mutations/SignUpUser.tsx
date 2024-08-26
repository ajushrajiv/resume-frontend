import api from "@/api/config/api";
import { saveAccessTokens } from "@/utils/TokenHandler";

async function signUpUser(username: string, password: string, email: string){
    try{
        const result = await api.post("/auth/signup",{
            username:username,
            password: password,
            email: email
        },{
            headers: {
                'Content-Type': 'application/json' // Set Content-Type to JSON
            }
        } 
        );
        console.log("RESULT SIGNUPUSER",result.data);

        const { user, tokens } = result.data;
        const accessToken = tokens.accessToken;
        saveAccessTokens(accessToken);
        return { user, accessToken };
    }catch(error){
        throw new Error("Failed");
    } 
}

export default signUpUser;