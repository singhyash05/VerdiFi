import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-black-translucent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white">VerdiFi</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-300 hover:text-green-400">Dashboard</Link>
            <Link to="/rewards" className="text-gray-300 hover:text-green-400">Rewards</Link>
            <Link to="/marketplace" className="text-gray-300 hover:text-green-400">Marketplace</Link>
            <Link to="/about" className="text-gray-300 hover:text-green-400">About</Link>
            <Link to="/team" className="text-gray-300 hover:text-green-400">Team</Link>
            <button className="bg-green-600/80 text-white px-4 py-2 rounded-lg hover:bg-green-500/80 transition-colors backdrop-blur-sm">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;