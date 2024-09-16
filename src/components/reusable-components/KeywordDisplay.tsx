"use client";

import React from 'react';

function KeywordDisplay({ keywords }:KeywordDisplayProps) {

  const keywordArray = keywords.split(' ');

  const getRandomColor = () => {
    const colors = ['#75BDE0', '#345DA7', '#7339AB', '#028174'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className=" whitespace-pre-wrap leading-loose block w-full text-sky-600 bg-gray-50 text-text-blue text-lg tracking-wide border border-gray-500 rounded pt-4 px-12 mb-3 focus:outline-none focus:bg-white overflow-auto">
      {keywordArray.map((keyword, index) => (
        <span key={index} style={{ color: getRandomColor() }}>
          {keyword}{' '}
        </span>
      ))}
    </div>
  );
}

export default KeywordDisplay;