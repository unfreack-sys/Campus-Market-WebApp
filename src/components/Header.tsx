import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, ShoppingBagIcon, MessageCircleIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function Header({
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CampusMarket</h1>
          </div>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search for textbooks, electronics, furniture..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/messages')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <MessageCircleIcon className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <UserIcon className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">
                {user?.name}
              </span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <LogOutIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
}