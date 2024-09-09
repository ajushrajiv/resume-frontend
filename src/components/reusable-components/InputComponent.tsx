// InputComponent.js
import React from 'react';

const InputComponent: React.FC<InputComponentProps> = ({ name, value, onChange, placeholder }) => {
    return (
    <div className="w-full">
      <input
        className="appearance-none block w-full h-12 text-black border-2 border-gray-200 border-l-gray-400 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-left overflow-auto"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
