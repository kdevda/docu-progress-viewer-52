
import React from 'react';
import { Bell, HelpCircle, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 w-full flex justify-between items-center h-16 px-6 z-10">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/d53d268c-e6c5-4abb-8df8-6ba865ad6ae0.png" 
          alt="Nano Banc" 
          className="h-8 w-auto"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-[#a29f95] transition-colors duration-200">
          <Bell size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-[#a29f95] transition-colors duration-200">
          <HelpCircle size={20} />
        </button>
        <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors duration-200">
          <div className="w-8 h-8 rounded-full bg-[#a29f95] flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
