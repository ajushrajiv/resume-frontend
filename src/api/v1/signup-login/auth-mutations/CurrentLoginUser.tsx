import api from "@/api/config/api";
import { saveAccessTokens } from "@/utils/TokenHandler";

async function currentLoginUser(email: string, password: string){

    const result = await api.post("/auth/login",{
        email,password
    },{
        headers: {
            'Content-Type': 'application/json' // Set Content-Type to JSON
        }
    } );
    console.log("RESULT LOGINUSER",result.data);

    const { user, tokens } = result.data;
    const accessToken = tokens.accessToken;
    saveAccessTokens(accessToken);
    console.log("SAVe ACCESS TOKENS",  accessToken)
    return { user, accessToken };
}

export default currentLoginUser;