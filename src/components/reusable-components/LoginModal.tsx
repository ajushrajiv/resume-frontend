"use client"

import { LoginModalProps } from '@/interfaces/LoginModalProps';
import React from 'react';
import { useRouter } from 'next/navigation';

function LoginModal({ isOpen, onClose, confirmText }:LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    router.push('/login');
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className=" bg-white font-glegoo p-6 rounded-lg shadow-lg">
        <h2 className="text-lg text-custom-blue font-bold  mb-4">{confirmText}</h2>
        <div className="flex justify-center items-center">
          <button
            className="bg-custom-blue text-white py-2 w-24 rounded hover:bg-button-blue"
            onClick={handleLoginRedirect}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
