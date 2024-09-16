"use client";

import React from 'react';

function TableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-custom-blue dark:bg-custom-blue dark:text-white">
        <tr>
            <th scope="col" className="px-6 py-3">Job description</th>
            <th scope="col" className="px-6 py-3">Resume</th>
            <th scope="col" className="px-6 py-3">Company name</th>
            <th scope="col" className="px-6 py-3">Job title</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Date</th>
        </tr>
    </thead>
  );
}

export default TableHeader;