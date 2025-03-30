import React from 'react';
import { Wallet, ArrowUpDown, Award } from 'lucide-react';

const Dashboard = () => {
  const mockTransactions = [
    { id: 1, type: 'Plastic', amount: '2.5 kg', tokens: '25 VRFI', date: '2024-03-15' },
    { id: 2, type: 'Paper', amount: '1.8 kg', tokens: '18 VRFI', date: '2024-03-14' },
    { id: 3, type: 'Glass', amount: '3.0 kg', tokens: '30 VRFI', date: '2024-03-13' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center mb-4">
            <Wallet className="h-6 w-6 text-green-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Token Balance</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">250 VRFI</p>
        </div>

        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center mb-4">
            <ArrowUpDown className="h-6 w-6 text-green-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Total Disposed</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">25.8 kg</p>
        </div>

        <div className="bg-green-950 p-6 rounded-lg shadow-xl card-hover animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-green-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Impact Level</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">Silver</p>
        </div>
      </div>

      <div className="bg-green-950 rounded-lg shadow-xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-green-800">
                <th className="text-left py-3 px-4 text-green-200">Type</th>
                <th className="text-left py-3 px-4 text-green-200">Amount</th>
                <th className="text-left py-3 px-4 text-green-200">Tokens Earned</th>
                <th className="text-left py-3 px-4 text-green-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx, index) => (
                <tr key={tx.id} className="border-b border-green-800 animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                  <td className="py-3 px-4 text-green-100">{tx.type}</td>
                  <td className="py-3 px-4 text-green-100">{tx.amount}</td>
                  <td className="py-3 px-4 text-green-100">{tx.tokens}</td>
                  <td className="py-3 px-4 text-green-100">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;