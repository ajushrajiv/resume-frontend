"use client";

import React from 'react';

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label className="block uppercase tracking-wide text-custom-blue text-base font-light mb-2">
        {text}
    </label>
  );
}

export default Label;