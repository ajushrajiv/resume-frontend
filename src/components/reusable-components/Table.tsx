"use client";

import { TableProps } from '@/interfaces/TableProps';
import React from 'react';

function Table({ children }:TableProps){
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {children}
        </table>
    </div>
  );
}

export default Table;