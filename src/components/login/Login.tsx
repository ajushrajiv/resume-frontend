"use client"

import React, { useState, useContext } from 'react';
import ResumeButton from '../reusable-components/ResumeButton';
import UserContext from '@/contexts/UserContext';
import Link from 'next/link';
import FormLabelInput from '../reusable-components/FormLabelInput';

function Login() {
    const userContext = useContext(UserContext);
    
    if (!userContext) {
        throw new Error("useContext(UserContext) must be used within a UserProvider");
    }
    
    const { loginUser } = userContext;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const [formData, setFormData] = useState({
      email: '',
      password: ''
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
        console.log('Calling LoginUser');
        const response = await loginUser( formData.email, formData.password);
  
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
        email:'',
        password: ''
      });
    };
      
  return (
    <div>
      <div className="flex justify-center min-h-32 ">
        <form className="bg-blue-50 w-full max-w-lg mt-16 p-4 rounded-lg border border-gray-300" onSubmit={handleSubmit}>
          <div>
            <div className='w-full md:mb-0 text-2xl text-custom-blue ml-2'>
              <h4>Sign in</h4>
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
            
          </div>
          <div className="flex justify-center mt-4">
              <ResumeButton text="Sign in" />
          </div>

        </form>
      </div>
      
      <div className="relative mt-12 flex justify-center items-center">
        <div className="w-1/6 border-t border-gray-300"></div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-gray-500 font-light">
            New to Match My Resume
          </span>
        </div>
        <div className="w-1/6 border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center mt-4">
        <a 
          href="/signup" 
          className='text-custom-blue text-lg border border-gray-300 px-4 py-1 rounded-lg shadow-md'>
            Create your account
        </a>
      </div>
    </div>
  );
}

export default Login;