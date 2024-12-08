import React, { useEffect } from 'react';

export const Modal = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000); // Hide modal after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
    return undefined;
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Message</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-red-800">{message}</p>
      </div>
    </div>
  );
};
