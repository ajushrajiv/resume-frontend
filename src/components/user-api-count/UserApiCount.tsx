import userRequestCount from "@/api/v1/signup-login/user-queries/UserRequestCount";
import UserContext from "@/contexts/UserContext";
import React, { useEffect, useState, useContext } from "react";

const UserApiCount: React.FC = ()  => {
  const [userQueryCount, setUserQueryCount] = useState<number | null>(null);  
  const [loading, setLoading] = useState(true);      
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error("UserContext is undefined, make sure Profile is wrapped in a UserProvider");
  }

  const { user } = userContext;

  useEffect(() => {
    const fetchUserCount = async () => {
      if(user){
        try {
          const data = await userRequestCount();   
          console.log("user query count",data)
          setUserQueryCount(data?.hitCount ?? null);
        } catch (error) {
          console.error("Error fetching user count:", error);
        } finally {
          setLoading(false);             
        }
      };
      }
      
    fetchUserCount();  
  }, [user]);  

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {userQueryCount !== null ? (
        <p>{userQueryCount}</p>
      ) : (
        <p>Error fetching user count</p>
      )}
    </div>
  );
};

export default UserApiCount;
