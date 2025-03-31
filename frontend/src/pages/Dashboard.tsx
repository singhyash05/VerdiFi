import React, { useEffect, useState } from "react";
import { Wallet, ArrowUpDown, Award, RefreshCw } from "lucide-react";
import {
  getDashboardData,
  connectWallet,
  getVerdiFiCoreContract,
} from "../utils/web3funcs.js";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [totalWaste, setTotalWaste] = useState("0");
  const [rank, setRank] = useState("None");
  const [disposalHistory, setDisposalHistory] = useState([]);
  const [account, setAccount] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Not connected");
  const [verificationStatus, setVerificationStatus] = useState("Unknown");

  const isWalletConnected = () => {
    return window.ethereum && window.ethereum.selectedAddress;
  };

  const handleConnectWallet = async () => {
    try {
      setConnecting(true);
      setConnectionStatus("Connecting...");

      const { account, web3 } = await connectWallet();
      setAccount(account);
      setConnectionStatus(
        `Connected to ${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      );

      try {
        const coreContract = getVerdiFiCoreContract();
        const entityDetails = await coreContract.methods.getEntityDetails(account).call();
        setVerificationStatus(entityDetails[5] ? "Verified" : "Not Verified");
      } catch (verifyError) {
        console.error("Failed to check verification status:", verifyError);
        setVerificationStatus("Error checking verification");
      }

      await fetchDashboardData();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setConnectionStatus(`Connection failed: ${error.message}`);
      alert("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.");
    } finally {
      setConnecting(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      if (isWalletConnected()) {
        const data = await getDashboardData();
        console.log("Dashboard data:", data);

        // Ensure proper conversion of BigInt values to strings
        setTokenBalance(data.tokenBalance.toString());
        setTotalWaste(data.totalWaste.toString());
        setRank(data.rank);
        setDisposalHistory(data.disposalHistory || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isWalletConnected()) {
      handleConnectWallet();
    } else {
      setLoading(false);
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          handleConnectWallet();
        } else {
          setAccount("");
          setConnectionStatus("Disconnected");
        }
      });
    }
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString();
  };

  if (!isWalletConnected()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="p-8 bg-green-950 border border-green-800 rounded-lg text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">VerdiFi Dashboard</h1>
          <p className="text-green-200 mb-6">
            Connect your wallet to view your impact metrics and transaction history.
          </p>
          <button
            onClick={handleConnectWallet}
            disabled={connecting}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center w-full"
          >
            {connecting ? "Connecting..." : <> <Wallet className="h-5 w-5 mr-2" /> Connect Wallet </>}
          </button>
          <p className="text-green-300 mt-4 text-sm">{connectionStatus}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading blockchain dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={fetchDashboardData} className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg text-white flex items-center">
          <RefreshCw className="h-4 w-4 mr-1" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-950 p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold">Token Balance</h3>
          <p className="text-3xl font-bold">{tokenBalance} VRFI</p>
        </div>
        <div className="bg-green-950 p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold">Total Disposed</h3>
          <p className="text-3xl font-bold">{totalWaste} kg</p>
        </div>
        <div className="bg-green-950 p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold">Impact Level</h3>
          <p className="text-3xl font-bold">{rank}</p>
        </div>
      </div>

      <div className="bg-green-950 rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-green-800">
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Tokens Earned</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {disposalHistory.length > 0 ? (
              disposalHistory.map((tx, index) => (
                <tr key={index} className="border-b border-green-800">
                  <td className="py-3 px-4">{tx.wasteType}</td>
                  <td className="py-3 px-4">{tx.wasteAmount} kg</td>
                  <td className="py-3 px-4">{tx.tokensEarned} VRFI</td>
                  <td className="py-3 px-4">{formatDate(tx.timestamp)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center">
                  No transactions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
