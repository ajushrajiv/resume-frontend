"use client";

import React from 'react';

const TextArea: React.FC<TextAreaProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <textarea
        className="appearance-none block w-full h-96 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
    />
  );
}

export default TextArea;