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
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
      
      <div className="w-full px-3 mb-6 md:mb-0">
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
          <h4 className='text-custom-blue text-lg'>Click here to signup</h4><Link href="/signup" className='text-custom-blue text-lg underline'>SignUp</Link>
      </div>
      <div className="flex justify-center mt-4">
          <ResumeButton text="Login" />
      </div>

    </form>

  );
}

export default Login;