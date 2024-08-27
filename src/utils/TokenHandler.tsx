export function saveAccessTokens(accessToken: string) {
    if (typeof window !== "undefined") {
      try {
        console.log("Saving Access Token:", accessToken);
        localStorage.setItem("accessToken", accessToken);
        console.log("Access token saved successfully:", accessToken);
      } catch (error) {
        console.error("Error saving access token:", error);
      }
    }
  }
  
  export function getAccessToken() {
    if (typeof window !== "undefined") {
      const savedtoken = localStorage.getItem("accessToken");
      console.log("Retrieved Access Token:", savedtoken);
      return savedtoken
    }
    return null;
  }
  
  export function deleteAccessToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  }
  
  export function setAccessToken(accessToken: string) {
    return saveAccessTokens(accessToken);
  }
  