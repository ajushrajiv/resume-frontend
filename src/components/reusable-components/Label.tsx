"use client";

import React from 'react';

function Label({ text }:LabelProps) {
  return (
    <label className="block tracking-wide text-blue-400 text-base font-bold mb-0">
        {text}
    </label>
  );
}

export default Label;