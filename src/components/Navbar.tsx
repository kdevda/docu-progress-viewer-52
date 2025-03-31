
import React from 'react';
import { Bell, HelpCircle, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleViewChange = (view: 'client' | 'agent') => {
    if (view === 'client') {
      navigate('/dashboard');
    } else {
      navigate('/agent');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 w-full flex justify-between items-center h-16 px-6 z-10">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/6894aabf-3c80-4a2f-89ad-4e49519b9216.png" 
          alt="Redwood Credit Union" 
          className="h-8 w-auto"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-[#20703F] transition-colors duration-200">
          <Bell size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-[#20703F] transition-colors duration-200">
          <HelpCircle size={20} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-[#20703F] flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleViewChange('client')}>
              Client View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewChange('agent')}>
              Agent View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
