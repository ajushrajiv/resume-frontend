"use client"

import { ConfirmModalProps } from '@/interfaces/ConfirmModalProps';
import React from 'react';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Navigation</h2>
        <p className="mb-4">Do you want to proceed to the comparison page?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-custom-blue text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
