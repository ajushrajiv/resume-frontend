import api from "@/api/config/api";

async function verifyAccessToken(accessToken: string) {
    try {
        const response = await api.post("/users/currentuser", {
            accessToken
        });
        // Assuming the server returns user data if the token is valid
        const user = response.data.user;
        return { user };
    } catch (error) {
        // Handle error (e.g., token expired, invalid token)
        throw new Error("Failed to verify access token");
    }
}

export default verifyAccessToken;