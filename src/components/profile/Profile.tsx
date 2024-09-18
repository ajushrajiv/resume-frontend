"use client"

import React, { useContext, useEffect,useState } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import UserApiCount from '../user-api-count/UserApiCount';
import ConfirmModal from '../reusable-components/ConfirmModal';
import deleteUserById from '@/api/v1/signup-login/auth-mutations/DeleteUserById';
import { CiMail } from "react-icons/ci";

function Profile() {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!userContext) {
    throw new Error("UserContext is undefined, make sure Profile is wrapped in a UserProvider");
  }

  const { user, logOutUser, loadCurrentUser } = userContext;

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    handleDelete(); 
  };

  const handleDelete = async () => {
    if (user?.id) {
      try {
        await deleteUserById(user.id);
        logOutUser();
        router.push('/'); 
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };
  
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

  return (
    <div className='flex justify-center items-center'>
      <div className='mt-24 w-1/6 h-4/6 font-glegoo'>
        {user ? (
          <div className="p-6 rounded-lg shadow-lg bg-blue-100 flex flex-col justify-center items-center">
              <button className="bg-icon-color hover:bg-button-blue text-white font-bold text-2xl px-2 py-2 w-2/6 rounded-full mb-1" >
                  {user.username ? user.username.charAt(0).toUpperCase() : ''}
              </button>

              <div className="text-md font-light text-custom-blue mb-6">
                  <p >{user.username}</p>
              </div>
              
              <div className="text-md mb-12 font-light text-custom-blue ">
                  <p className='flex flex-row'><CiMail className='text-2xl pr-1 text-blue-700'/>{user.email}</p>
              </div>
              
              <div className="flex flex-col items-center p-4 mt-8 w-full bg-blue-50 border border-gray-200 text-custom-blue rounded-md">
                <h5 className="text-base mb-4 font-base tracking-tight text-gray-900">
                  Compare Requests
                </h5>
              
                <div className='text-center pt-4 bg-white w-12 h-16 text-xl font-bold text-center border border-blue-50 rounded-lg shadow-lg'>
                  <UserApiCount/>
                </div>
              </div>

            <div className='border border-red-400 rounded-lg mt-4 float-right'>
              <button className="text-lg font-light text-red-400 px-4 cursor-pointer" onClick={handleOpenDeleteModal}>
                Delete account
              </button>
            </div>
            <div className='text-custom-blue'>
              <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                confirmText="Delete account"
                confirmDescription="Are you sure you want to delete your account? This action cannot be undone."
              />
            </div>
          </div>
        ) : (
          <p className="flex justify-center mt-4 bg-custom-blue">Please log in.</p>
        )}
      </div>
    </div>
  );
}


export default Profile;