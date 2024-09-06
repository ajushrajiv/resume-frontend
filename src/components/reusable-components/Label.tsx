"use client";

import React from 'react';

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label className="block uppercase tracking-wide text-blue-400 text-base font-bold mb-2">
        {text}
    </label>
  );
}

export default Label;