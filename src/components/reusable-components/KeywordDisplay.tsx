"use client";

import React from 'react';

const KeywordDisplay: React.FC<KeywordDisplayProps> = ({ keywords }) => {
  return (
    <div className=" whitespace-pre-wrap leading-loose block w-full h-96 bg-gray-50 text-text-blue text-lg tracking-wide border border-gray-500 rounded pt-4 px-12 mb-3 focus:outline-none focus:bg-white overflow-auto">
      {keywords}
    </div>
  );
}

export default KeywordDisplay;