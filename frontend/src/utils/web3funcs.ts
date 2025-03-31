// @ts-nocheck
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

// ------------------ Constants ------------------

// Deployed contract addresses on Holesky
export const VerdiFiTokens_Address_Holesky = "0x3d7f16f43A7E71b12eE6A3e406Bf60041E281fe8";
export const Verifier_Address_Holesky = "0xD4BBC178f19E2f9A00a9A9D4fF0D7E6b18f1D729";
export const VerdiFiCore_Address_Holesky = "0xD4f31C093d562eD8CD9C7585a9787c8752843c25";

// ABI for VerdiFiToken contract
export const VerdiFiToken_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "initialSupply", "type": "uint256" },
      { "internalType": "address", "name": "_verifier", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "allowance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "approver", "type": "address" }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      { "internalType": "uint8", "name": "", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ABI for VerdiFiCore contract
export const VerdiFiCore_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "tokenAddress", "type": "address" },
      { "internalType": "uint256", "name": "_rewardRatio", "type": "uint256" },
      { "internalType": "address", "name": "_verifier", "type": "address" },
      { "internalType": "uint256", "name": "_registrationFee", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "wasteType", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "wasteAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "tokensEarned", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DisposalRecorded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "entity", "type": "address" },
      { "indexed": false, "internalType": "enum VerdiFiRegistry.Role", "name": "role", "type": "uint8" },
      { "indexed": false, "internalType": "string", "name": "organizationName", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "displayName", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "phoneNumber", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "email", "type": "string" }
    ],
    "name": "EntityRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "entity", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "reason", "type": "string" }
    ],
    "name": "EntityRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "entity", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "verified", "type": "bool" }
    ],
    "name": "EntityVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "enum VerdiFiCore.Rank", "name": "newRank", "type": "uint8" }
    ],
    "name": "OrganizationRankUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "newRewardRatio", "type": "uint256" }
    ],
    "name": "PlatformSettingsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "rewardAmount", "type": "uint256" }
    ],
    "name": "RewardTriggered",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getDisposalHistory",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "wasteType", "type": "string" },
          { "internalType": "uint256", "name": "wasteAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "tokensEarned", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct VerdiFiCore.DisposalEvent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "entity", "type": "address" }
    ],
    "name": "getEntityDetails",
    "outputs": [
      { "internalType": "enum VerdiFiRegistry.Role", "name": "role", "type": "uint8" },
      { "internalType": "string", "name": "organizationName", "type": "string" },
      { "internalType": "string", "name": "displayName", "type": "string" },
      { "internalType": "uint256", "name": "phoneNumber", "type": "uint256" },
      { "internalType": "string", "name": "email", "type": "string" },
      { "internalType": "bool", "name": "verified", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "organizationRank",
    "outputs": [
      { "internalType": "enum VerdiFiCore.Rank", "name": "", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "string", "name": "wasteType", "type": "string" },
      { "internalType": "uint256", "name": "wasteAmount", "type": "uint256" }
    ],
    "name": "recordDisposalEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "entity", "type": "address" },
      { "internalType": "enum VerdiFiRegistry.Role", "name": "role", "type": "uint8" },
      { "internalType": "string", "name": "organizationName", "type": "string" },
      { "internalType": "string", "name": "displayName", "type": "string" },
      { "internalType": "uint256", "name": "phoneNumber", "type": "uint256" },
      { "internalType": "string", "name": "email", "type": "string" }
    ],
    "name": "registerEntity",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registrationFee",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "entity", "type": "address" },
      { "internalType": "string", "name": "reason", "type": "string" }
    ],
    "name": "removeEntity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardRatio",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "totalWasteDisposed",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "newFee", "type": "uint256" }
    ],
    "name": "updateRegistrationFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verdifiToken",
    "outputs": [
      { "internalType": "contract VerdiFiToken", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "entity", "type": "address" },
      { "internalType": "bool", "name": "status", "type": "bool" }
    ],
    "name": "verifyEntity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ------------------ Web3 Utility Functions ------------------

let web3: Web3 | undefined;
let currentAccount: string = "";

/**
 * Connects to MetaMask and initializes Web3.
 */
export async function connectWallet(): Promise<{ web3: Web3; account: string }> {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts: string[] = await web3.eth.getAccounts();
      currentAccount = accounts[0];
      console.log("Wallet connected, account:", currentAccount);
      return { web3, account: currentAccount };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  } else {
    alert("MetaMask is not installed!");
    throw new Error("MetaMask is not installed");
  }
}

/**
 * Returns an instance of the VerdiFiCore contract.
 */
export function getVerdiFiCoreContract(): Contract {
  if (!web3) throw new Error("Web3 is not initialized");
  return new web3.eth.Contract(VerdiFiCore_ABI as any, VerdiFiCore_Address_Holesky);
}

/**
 * Returns an instance of the VerdiFiToken contract.
 */
export function getVerdiFiTokenContract(): Contract {
  if (!web3) throw new Error("Web3 is not initialized");
  return new web3.eth.Contract(VerdiFiToken_ABI as any, VerdiFiTokens_Address_Holesky);
}

/**
 * Mapping for converting numeric rank (uint8) to human-readable strings.
 */
const rankMapping: { [key: number]: string } = {
  0: "None",
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Platinum",
};

/**
 * Fetches dashboard data from the blockchain for the connected account.
 * Data includes:
 *  - Disposal history (array of disposal events)
 *  - Total waste disposed
 *  - Organization rank (human-readable)
 *  - Token balance (converted from wei to ether)
 */
export async function getDashboardData(): Promise<{
  disposalHistory: any[];
  totalWaste: string;
  rank: string;
  tokenBalance: string;
}> {
  if (!web3 || !currentAccount) {
    throw new Error("Wallet not connected");
  }

  const coreContract = getVerdiFiCoreContract();
  const tokenContract = getVerdiFiTokenContract();

  try {
    // Fetch disposal history from the core contract
    const disposalHistory = await coreContract.methods.getDisposalHistory(currentAccount).call();

    // Fetch total waste disposed by the account
    const totalWaste = await coreContract.methods.totalWasteDisposed(currentAccount).call();

    // Fetch organization rank (as a number)
    const rankNumber = await coreContract.methods.organizationRank(currentAccount).call();
    const rank = rankMapping[Number(rankNumber)] || "Unknown";

    // Fetch token balance from the token contract
    const rawBalance = await tokenContract.methods.balanceOf(currentAccount).call();
    const scaledBalance = rawBalance * BigInt(12030000000000);

    const tokenBalance = web3.utils.fromWei(scaledBalance, "ether");
    console.log("Raw balance : ",rawBalance) //Right now i have multiplied as for testing purpose only some contracts has to be audited like decimals are creating issue
    return {
      disposalHistory,
      totalWaste,
      rank,
      tokenBalance, //@audit
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
