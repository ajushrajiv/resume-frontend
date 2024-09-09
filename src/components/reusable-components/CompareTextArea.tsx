"use client";

import React from 'react';

const CompareTextArea: React.FC<TextAreaProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <textarea
        className="appearance-none block w-full h-60 text-black border-2 border-gray-200 border-l-gray-400 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        spellCheck="false"
    />
  );
}

export default CompareTextArea;