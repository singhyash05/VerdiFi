import React from 'react';
import { Leaf, Recycle, Coins } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 animate-fade-in">
        <div className="flex justify-center mb-6">
          <Leaf className="h-16 w-16 text-green-400 animate-pulse-slow" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to VerdiFi
        </h1>
        <p className="text-xl text-green-100 max-w-2xl mx-auto">
          Revolutionizing waste management through blockchain technology. 
          Earn rewards for responsible disposal and contribute to a cleaner future.
        </p>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center mb-4">
            <Recycle className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Smart Disposal</h3>
          <p className="text-green-200">Track your waste disposal and earn tokens for responsible management</p>
        </div>

        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-center mb-4">
            <Coins className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
          <p className="text-green-200">Convert your environmental responsibility into valuable tokens</p>
        </div>

        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Eco Impact</h3>
          <p className="text-green-200">Join a community committed to sustainable waste management</p>
        </div>
      </div>
    </div>
  );
};

export default Home;