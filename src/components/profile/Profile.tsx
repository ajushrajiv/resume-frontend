"use client"

import React, { useContext, useEffect } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import ResumeButton from '../reusable-components/ResumeButton';

function Profile() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext is undefined, make sure Profile is wrapped in a UserProvider");
  }

  const { user, logOutUser, loadCurrentUser } = userContext;

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        try {
          await loadCurrentUser();
        } catch (error) {
          console.error("Failed to load current user", error);
          router.push('/login'); 
        }
      }
    };

    loadUser();
  }, [user, loadCurrentUser, router]);

  console.log("Current User:", user);

  const handleLogout = () => {
    logOutUser();
    router.push('/login'); 
  };

  return (
    <div>
      {user ? (
        <div>
         <div className="flex justify-center mt-4 bg-custom-blue">
          <p className="flex justify-center mt-4 bg-custom-blue">{user.username}</p>
         </div>
        </div>
      ) : (
        <p className="flex justify-center mt-4 bg-custom-blue">Please log in.</p>
      )}
    </div>
  );
}


export default Profile;