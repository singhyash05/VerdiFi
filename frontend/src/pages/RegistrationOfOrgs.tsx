import React, { useState } from "react";
import { Wallet, CheckCircle } from "lucide-react";
import { connectWallet, getVerdiFiCoreContract } from "../utils/web3funcs.js";

const RegistrationOfOrgs = () => {
  const [account, setAccount] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);
  const [status, setStatus] = useState("");

  const roleOptions = [
    { label: "None", value: 0 },
    { label: "Waste Disposer", value: 1 },
    { label: "Recycling Company", value: 2 },
    { label: "Service Provider", value: 3 },
  ];

  const [role, setRole] = useState(0); // Default to None (0)

  const handleConnectWallet = async () => {
    try {
      const { account } = await connectWallet();
      setAccount(account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Ensure MetaMask is installed and unlocked.");
    }
  };

  const handleRegister = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setRegistering(true);
      setStatus("Registering...");
      const coreContract = getVerdiFiCoreContract();
      
      await coreContract.methods
        .registerEntity(account, Number(role), organizationName, displayName, phoneNumber, email)
        .send({ from: account, value: "10000000000000000" }); // Example fee

      setStatus("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus("Registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-green-950 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Register Organization</h1>
        <button
          onClick={handleConnectWallet}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg flex items-center justify-center mb-4"
        >
          <Wallet className="h-5 w-5 mr-2" /> {account ? `Connected: ${account.substring(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
        
        <input type="text" className="w-full p-2 rounded bg-gray-800 mb-2" placeholder="Organization Name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
        <input type="text" className="w-full p-2 rounded bg-gray-800 mb-2" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <input type="text" className="w-full p-2 rounded bg-gray-800 mb-2" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <input type="email" className="w-full p-2 rounded bg-gray-800 mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <select className="w-full p-2 rounded bg-gray-800 mb-4" value={role} onChange={(e) => setRole(Number(e.target.value))}>
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleRegister}
          disabled={registering}
          className="bg-green-700 hover:bg-green-600 w-full py-2 rounded-lg flex items-center justify-center"
        >
          {registering ? "Registering..." : "Register Organization"}
        </button>

        {status && (
          <p className="mt-4 text-center text-green-300 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" /> {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistrationOfOrgs;