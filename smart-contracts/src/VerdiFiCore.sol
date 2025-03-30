// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VerdiFiToken} from "./VerdiToken.sol";
import {VerdiFiRegistry} from "./VerdiFiRegistry.sol";

contract VerdiFiCore is VerdiFiRegistry {
    // Extended disposal event including waste type, amount, tokens earned and timestamp.
    struct DisposalEvent {
        string wasteType;       // e.g. "Plastic", "Metal", etc.
        uint256 wasteAmount;    // Waste amount (e.g., in kg or a smaller unit for precision)
        uint256 tokensEarned;   // Tokens earned for this disposal event.
        uint256 timestamp;      // The date/time when the event was recorded.
    }
    
    // Enum for organization ranking.
    enum Rank { None, Bronze, Silver, Gold, Platinum }
    
    // Mapping of user address to an array of their disposal events.
    mapping(address => DisposalEvent[]) private disposalHistory;
    
    // Mapping to track the cumulative waste disposed by each organization.
    mapping(address => uint256) public totalWasteDisposed;
    
    // Mapping to track the current rank for each organization.
    mapping(address => Rank) public organizationRank;
    
    // Reward ratio: number of tokens rewarded per unit of waste disposed.
    uint256 public rewardRatio;
    
    // Instance of the VerdiFi ERC20 Token contract.
    VerdiFiToken public verdifiToken;
    
    event DisposalRecorded(
        address indexed user, 
        string wasteType,
        uint256 wasteAmount, 
        uint256 tokensEarned, 
        uint256 timestamp
    );
    event RewardTriggered(address indexed user, uint256 rewardAmount);
    event PlatformSettingsUpdated(uint256 newRewardRatio);
    event OrganizationRankUpdated(address indexed user, Rank newRank);
    
    // Thresholds for ranking (in the same waste unit used in disposal events)
    uint256 constant SILVER_THRESHOLD = 100;
    uint256 constant GOLD_THRESHOLD = 500;
    uint256 constant PLATINUM_THRESHOLD = 1000;

    // Modifier to restrict functions to only the IoT device wallet.
    // For now, this enforces that msg.sender equals verifier.
    modifier onlyIOTDevice() {
        require(msg.sender == verifier, "Not authorized: Only IoT device allowed");
        _;
    }
    
    // Constructor receives the address of the deployed token, an initial reward ratio,
    // verifier address (used as the IoT device), and a registration fee.
    constructor(
        address tokenAddress, 
        uint256 _rewardRatio, 
        address _verifier, 
        uint256 _registrationFee
    ) VerdiFiRegistry(_verifier, _registrationFee) {
        verdifiToken = VerdiFiToken(tokenAddress);
        rewardRatio = _rewardRatio;
    }
    
    // Logs a waste disposal event and triggers the corresponding reward.
    // Requires that the user is registered and verified on the platform.
    // This function is now callable only by the authorized IoT device.
    function recordDisposalEvent(address user, string memory wasteType, uint256 wasteAmount) external onlyIOTDevice {
        // Check that the user is registered and verified.
        (, , , , , bool verified) = getEntityDetails(user);
        require(verified, "User is not verified or not registered on the protocol");
        
        uint256 tokensEarned = wasteAmount * rewardRatio;
        disposalHistory[user].push(DisposalEvent(wasteType, wasteAmount, tokensEarned, block.timestamp));
        emit DisposalRecorded(user, wasteType, wasteAmount, tokensEarned, block.timestamp);
        
        triggerReward(user, tokensEarned);
        
        // Update the total waste disposed and check if the organization's rank should be upgraded.
        totalWasteDisposed[user] += wasteAmount;
        _updateOrganizationRank(user);
    }
    
    // Calculates and issues token rewards based on the tokens earned from waste disposal.
    function triggerReward(address user, uint256 tokensEarned) internal {
        // Uncomment the following line once minting functionality is enabled in VerdiFiToken.
        // verdifiToken.mint(user, tokensEarned);
        emit RewardTriggered(user, tokensEarned);
    }
    
    // Internal function to update an organization's rank based on total waste disposed.
    function _updateOrganizationRank(address user) internal {
        Rank currentRank = organizationRank[user];
        Rank newRank = currentRank;
        uint256 totalWaste = totalWasteDisposed[user];
        
        if (totalWaste >= PLATINUM_THRESHOLD) {
            newRank = Rank.Platinum;
        } else if (totalWaste >= GOLD_THRESHOLD) {
            newRank = Rank.Gold;
        } else if (totalWaste >= SILVER_THRESHOLD) {
            newRank = Rank.Silver;
        } else if (totalWaste > 0) {
            newRank = Rank.Bronze;
        }
        
        if (newRank != currentRank) {
            organizationRank[user] = newRank;
            emit OrganizationRankUpdated(user, newRank);
        }
    }
    
    // Retrieves a user's waste disposal history.
    function getDisposalHistory(address user) external view returns (DisposalEvent[] memory) {
        return disposalHistory[user];
    }
}
