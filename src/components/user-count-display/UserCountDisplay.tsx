import countUser from "@/api/v1/signup-login/auth-mutations/CountUser";
import React, { useEffect, useState } from "react";

function UserCountDisplay() {
  const [userCount, setUserCount] = useState(null);  
  const [loading, setLoading] = useState(true);      

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const data = await countUser();   
        setUserCount(data.count);         
      } catch (error) {
        console.error("Error fetching user count:", error);
      } finally {
        setLoading(false);             
      }
    };

    fetchUserCount();  
  }, []);  

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {userCount !== null ? (
        <p>{userCount}</p>
      ) : (
        <p>Error fetching user count</p>
      )}
    </div>
  );
};

export default UserCountDisplay;
