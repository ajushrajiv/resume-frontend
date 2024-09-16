"use client";

import React from 'react';

function FormLabelInput({ text, placeholder, inputId, inputType, name,value, onChange }:FormLabelInputProps) {
  return (   
    <div> 
        <label htmlFor={inputId} className="text-sm font-medium text-gray-900 ">
            {text}
        </label>
        <input 
            type={inputType}
            id={inputId}
            name={name}
            aria-describedby="helper-text-explanation" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5 mb-6 outline-none" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
    </div>
  );
}

export default FormLabelInput;