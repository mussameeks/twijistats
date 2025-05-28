
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold flex items-center space-x-2">
          <img src={logo} alt="TwijiStats" className="w-8 h-8" />
          <span>TwijiStats</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
