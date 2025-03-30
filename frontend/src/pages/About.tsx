import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">About VerdiFi</h1>

        <div className="bg-green-950 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-green-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Our Mission</h2>
          </div>
          <p className="text-green-200 mb-4">
            VerdiFi is revolutionizing waste management by leveraging blockchain technology to incentivize and reward responsible disposal practices. Our platform connects environmentally conscious individuals with a decentralized ecosystem that promotes sustainability and transparency.
          </p>
          <p className="text-green-200">
            By tokenizing waste management efforts, we're creating a circular economy that benefits both the environment and our users. Every contribution to proper waste disposal is tracked, verified, and rewarded through our blockchain-based system.
          </p>
        </div>

        <div className="bg-green-950 rounded-lg shadow-xl p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="h-6 w-6 text-green-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">How does VerdiFi work?</h3>
              <p className="text-green-200">
                Users connect their wallet to the platform and receive VRFI tokens for properly disposing of waste. Each disposal is recorded on the blockchain, ensuring transparency and accountability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">What types of waste are accepted?</h3>
              <p className="text-green-200">
                We currently support the disposal of recyclable materials including plastic, paper, glass, and metal. Each category has specific guidelines for proper sorting and disposal.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">How are rewards calculated?</h3>
              <p className="text-green-200">
                Rewards are based on the weight and type of waste disposed. Additional bonuses are awarded for consistent participation and achieving specific milestones.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">What can I do with VRFI tokens?</h3>
              <p className="text-green-200">
                VRFI tokens can be used to access exclusive platform features, participate in governance decisions, and purchase eco-friendly products from our marketplace partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;