import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return (
      <div className='flex items-center gap-4 p-2'>
        <div className='w-10 h-10 bg-gray-200 text-gray-500 flex items-center justify-center rounded-full font-semibold'>
          ?
        </div>
        <div>
          <p className='text-sm text-gray-400'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-4 p-2'>
      {/* Avatar */}
      <div className='w-10 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-semibold shadow-sm'>
        {getInitials(userInfo.fullName)}
      </div>

      {/* User Info */}
      <div className='flex flex-col'>
        <span className='text-sm font-medium text-gray-800'>
          {userInfo.fullName}
        </span>
        <button
          onClick={onLogout}
          className='text-xs text-gray-800 hover:text-red-500 transition underline mt-0.5 self-start'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
