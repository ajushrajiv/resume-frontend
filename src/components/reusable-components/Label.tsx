"use client";

import React from 'react';

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label className="block tracking-wide text-blue-400 text-base font-medium mb-0">
        {text}
    </label>
  );
}

export default Label;