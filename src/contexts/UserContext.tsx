"use client"

import currentLoginUser from "@/api/v1/signup-login/auth-mutations/CurrentLoginUser";
import signUpUser from "@/api/v1/signup-login/auth-mutations/SignUpUser";
import currentUser from "@/api/v1/signup-login/user-queries/CurrentUser";
import { deleteAccessToken, getAccessToken, saveAccessTokens } from "@/utils/TokenHandler";
import { createContext, useState,useEffect, useCallback } from "react";
import React from 'react';

const UserContext = createContext<InterfaceUserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [ user, setUser ] = useState<InterfaceUser | null>(null);

    const logOutUser = useCallback(() => {
      setUser(null);
      deleteAccessToken();
      console.log("Logged out successfully");
    }, []);

    const loadCurrentUser = useCallback(async() => {
      try{
        const result = await currentUser();
        console.log("CurrentUser from the Usercontext",result)
        if (result) {
          setUser(result);
        }
        console.log("CurrentUser from the Usercontext2",result)
      }catch(error:any){
        if(error.response.status === 403){
          logOutUser();
        }
        console.log("Error from loadCurrentUser", error.response)
      }
    }, [logOutUser]);

    useEffect(() => {
      const token = getAccessToken();
      console.log("ACCESS TOKEN", token);
      if (token) {
        loadCurrentUser();
      } else {
        console.log("No token found, skipping loadCurrentUser");
      }
    }, [loadCurrentUser]);

    async function loginUser (email: string, password: string):Promise<InterfaceUser> {
        try {
            const{ user, accessToken } = await currentLoginUser(email, password);
            if (user && accessToken) {
              saveAccessTokens(accessToken);
              setUser(user);
              validateUser(accessToken);
              return user; 
          } else {
              throw new Error("Login failed: No user or access token returned");
          }
        } catch (error) {
            console.error("Login failed", error);
            throw error; 
        }
    };

    async function dataSignUpUser (username: string, password: string, email: string):Promise<InterfaceUser> {
      try {
          const{ user, accessToken } = await signUpUser(username, password, email);
          if (user && accessToken) {
            console.log("User and Access Token received:", user, accessToken);
            saveAccessTokens(accessToken); // Save the token
            setUser(user);
            validateUser(accessToken);
              return user;
          } else {
              console.error("Signup failed: No user or access token returned");
              throw new Error("Signup failed");
          }
      } catch (error) {
          console.error("Signup failed from userContext", error);
          throw error;
      }
    };
    
    function validateUser(accessToken:string){
        const storedAccessToken = getAccessToken();
        console.log("Stored Access Token:", storedAccessToken);
        console.log("New Access Token:", accessToken);
        
        // Compare the access tokens
        if (storedAccessToken === accessToken) {
            console.log("Access token matches. User is valid.");
        } else {
            console.log("Access token mismatch. User is not valid.");
        }
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logOutUser, dataSignUpUser, loadCurrentUser }}>
          {children}
        </UserContext.Provider>
      );
}
  
export default UserContext;