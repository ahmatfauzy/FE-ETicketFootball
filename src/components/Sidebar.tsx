import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Ticket, Home, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth(); 
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-blue-800 text-white w-64 p-4 flex flex-col h-full">
      <div className="text-xl font-bold mb-8 p-2">Admin Dashboard</div>
      <nav className="space-y-2 flex-1">
        <Link 
          to="/admin/dashboard" 
          className={`flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/dashboard') || (location.pathname === '/' ? 'bg-blue-700' : '')}`}
        >
          <Home className="mr-3 h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/matches" 
          className={`flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/matches')}`}
        >
          <Calendar className="mr-3 h-5 w-5" />
          <span>Matches</span>
        </Link>
        <Link 
          to="/tickets" 
          className={`flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/tickets')}`}
        >
          <Ticket className="mr-3 h-5 w-5" />
          <span>Tickets</span>
        </Link>
      </nav>
      <div className="pt-4 border-t border-blue-700 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center p-2 w-full rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;