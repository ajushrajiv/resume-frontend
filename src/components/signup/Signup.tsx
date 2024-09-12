"use client"

import React, { useState, useContext } from 'react';
import ResumeButton from '../reusable-components/ResumeButton';
import UserContext from '@/contexts/UserContext';
import Link from 'next/link';
import FormLabelInput from '../reusable-components/FormLabelInput';

function Signup() {
    const userContext = useContext(UserContext);
    
    if (!userContext) {
        throw new Error("useContext(UserContext) must be used within a UserProvider");
    }
    
    const { dataSignUpUser } = userContext;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      email: ''
    });

    const handleCloseError = () => {
        setErrorMessage(null);
      };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(`Input ${name} changed to: ${value}`);
      setFormData({ ...formData, [name]: value });
    };
    
      const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('handleSubmit called');
        console.log('Form data on submit:', formData);
        try{
          console.log('Calling dataSignUpUser');
          const response = await dataSignUpUser(formData.username, formData.password, formData.email);
    
        if (response) {
          console.log('Form submitted successfully:', response);
        } else {
            console.error('No response from dataSignUpUser');
        }
          
        }catch(error: any){
          if (error.message ) {
            // Display error message to the user
            setErrorMessage(error.message)
        } else {
            console.error("Signup failed", error);
        }
        } 
        setFormData({
          username: '',
          password: '',
          email: ''
        });
      };
      
  return (
    <div className="flex justify-center min-h-32 ">

      <form className="bg-blue-50 w-full max-w-lg mt-16 p-4 rounded-lg border border-gray-300" onSubmit={handleSubmit}>
        <div>
          <div className='w-full md:mb-0 text-2xl text-custom-blue ml-2'>
            <h4>Create Account</h4>
          </div>

          <div className="w-full px-3 mt-8 mb-6 md:mb-0">
            <FormLabelInput
              text="Email"
              placeholder="Enter your email"
              inputType="email"
              inputId="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <FormLabelInput
              text="Password"
              placeholder="Enter password"
              inputType="password"
              inputId="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="w-full px-3 md:mb-0">
            <FormLabelInput
              text="User name"
              placeholder="Enter a username"
              inputType="text"
              inputId="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="w-full px-3 md:mb-0 text-center">
            <ResumeButton text="Create" />
          </div>
          
        </div>

        <div className="flex justify-center mt-4">
            <h4 className='text-custom-blue text-sm pt-2'>
              Already have an account?
            </h4>
            <Link href="/login" className='text-blue-700 pl-1 text-lg underline'>
              Sign in
            </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;