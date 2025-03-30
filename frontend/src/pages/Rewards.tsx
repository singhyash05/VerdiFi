import React from 'react';
import { Gift, Trophy, Target } from 'lucide-react';

const Rewards = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Rewards & Tokenomics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-950 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">How to Earn Tokens</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Gift className="h-6 w-6 text-green-400 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Waste Disposal</h3>
                <p className="text-green-200">Earn 10 VRFI tokens per kg of properly sorted waste</p>
              </div>
            </li>
            <li className="flex items-start">
              <Trophy className="h-6 w-6 text-green-400 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Achievement Bonuses</h3>
                <p className="text-green-200">Unlock bonus rewards by reaching disposal milestones</p>
              </div>
            </li>
            <li className="flex items-start">
              <Target className="h-6 w-6 text-green-400 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Monthly Challenges</h3>
                <p className="text-green-200">Participate in monthly eco-challenges for extra tokens</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-green-950 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Token Utility</h2>
          <div className="space-y-4">
            <div className="border-b border-green-800 pb-4">
              <h3 className="font-semibold text-white mb-2">Marketplace Access</h3>
              <p className="text-green-200">Use VRFI tokens to purchase eco-friendly products and services</p>
            </div>
            <div className="border-b border-green-800 pb-4">
              <h3 className="font-semibold text-white mb-2">Governance Rights</h3>
              <p className="text-green-200">Participate in platform decisions and proposal voting</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Reward Tiers</h3>
              <p className="text-green-200">Access exclusive benefits and higher earning rates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-950 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Token Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">50%</div>
            <p className="text-green-200">User Rewards Pool</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">30%</div>
            <p className="text-green-200">Platform Development</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">20%</div>
            <p className="text-green-200">Community Initiatives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;