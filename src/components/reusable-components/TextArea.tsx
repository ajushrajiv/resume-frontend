"use client";

import React from 'react';

function TextArea({ name, value, onChange, placeholder }:TextAreaProps) {
  return (
    <textarea
        className="appearance-none block w-full h-72 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        spellCheck="false"
    />
  );
}

export default TextArea;