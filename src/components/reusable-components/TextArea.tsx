"use client";

import React, {useState} from 'react';

function TextArea({ name, value, onChange, placeholder }:TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full h-72">
      {!value && !isFocused && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-gray-400 text-lg">
          <p className="text-center opacity-60">
            <span className="italic">Paste job description or any text to extract keywords</span>
          </p>
        </div>
      )}
    <textarea
        className="appearance-none block w-full h-72 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        spellCheck="false"
    />
    </div>
  );
}

export default TextArea;