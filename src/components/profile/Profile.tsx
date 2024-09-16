"use client"

import React, { useContext, useEffect } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import UserApiCount from '../user-api-count/UserApiCount';

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
    <div className='font-glegoo'>
      {user ? (
         <div className="flex justify-center items-center mt-4 bg-custom-blue">
          <span className="text-md pb-4 font-light text-white ">
              <p >{user.username}</p>
              <p>{user.email}</p>
          </span>
          
          <div className="flex flex-col items-center p-8 m-8 max-w-xs bg-blue-50 border border-gray-200 text-custom-blue rounded-md">
            <h5 className="text-xl font-medium tracking-tight text-gray-900">
              Comparison
            </h5>
          
            <div className='text-center pt-4 bg-white w-12 h-16 text-xl font-bold text-center border border-blue-50 rounded-lg shadow-lg'>
              <UserApiCount/>
            </div>
          </div>
         </div>
      ) : (
        <p className="flex justify-center mt-4 bg-custom-blue">Please log in.</p>
      )}
    </div>
  );
}


export default Profile;