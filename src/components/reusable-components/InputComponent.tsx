// InputComponent.js
import React from 'react';

const InputComponent: React.FC<InputComponentProps> = ({ name, value, onChange, placeholder }) => {
    return (
    <div className="w-1/2 px-3">
      <input
        className="appearance-none block w-full h-12 bg-gray-50 text-black border border-gray-500 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
