import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  const isDelete = type === 'delete';

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-transform duration-500 ease-out
        ${isShown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        pointer-events-none`}
    >
      <div
        className={`flex items-center gap-4 px-5 py-3 rounded-xl shadow-lg border-l-4 min-w-64 max-w-xs
          ${isDelete ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'}
        `}
      >
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-full
            ${isDelete ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}
          `}
        >
          {isDelete ? <MdDeleteOutline className="text-lg" /> : <LuCheck className="text-lg" />}
        </div>

        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
