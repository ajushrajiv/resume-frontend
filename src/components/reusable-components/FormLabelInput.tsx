"use client";

import React from 'react';

const FormLabelInput: React.FC<FormLabelInputProps> = ({ text, placeholder, inputId, inputType, name,value, onChange }) => {
  return (   
    <div className="max-w-sm mx-auto"> 
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900 ">
            {text}
        </label>
        <input 
            type={inputType}
            id={inputId}
            name={name}
            aria-describedby="helper-text-explanation" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5 mb-4" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
    </div>
  );
}

export default FormLabelInput;