import Web3 from "web3";
import {
  VerdiFiCore_Address_Holesky,
  VerdiFiToken_ABI,
  VerdiFiCore_ABI,
  VerdiFiTokens_Address_Holesky,
} from "../constants.js"; // Adjust the path as needed

let web3;
let currentAccount = "";

/**
 * Connects to MetaMask and initializes Web3.
 */
export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
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
export function getVerdiFiCoreContract() {
  if (!web3) throw new Error("Web3 is not initialized");
  return new web3.eth.Contract(VerdiFiCore_ABI, VerdiFiCore_Address_Holesky);
}

/**
 * Returns an instance of the VerdiFiToken contract.
 */
export function getVerdiFiTokenContract() {
  if (!web3) throw new Error("Web3 is not initialized");
  return new web3.eth.Contract(VerdiFiToken_ABI, VerdiFiTokens_Address_Holesky);
}

/**
 * Mapping for converting numeric rank (uint8) to human-readable strings.
 */
const rankMapping = {
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
export async function getDashboardData() {
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
    const rank = rankMapping[rankNumber] || "Unknown";

    // Fetch token balance from the token contract
    const rawBalance = await tokenContract.methods.balanceOf(currentAccount).call();
    const tokenBalance = web3.utils.fromWei(rawBalance, "ether");

    return {
      disposalHistory,
      totalWaste,
      rank,
      tokenBalance,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
