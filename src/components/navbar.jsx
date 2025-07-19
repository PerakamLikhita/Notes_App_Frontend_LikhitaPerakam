import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-blue-600 border-b shadow-sm">
      {/* Left: Logo/Title */}
      <h1 className="text-2xl font-semibold text-white tracking-wide">
        Notes<span className="text-blue-200">App</span>
      </h1>


      {/* Right: Profile */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </header>
  );
};

export default Navbar;
