// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {VerdiFiToken} from "./VerdiToken.sol";

//
// Contract 1: VerdiFi Core Contract
//
contract VerdiFiCore {
    struct DisposalEvent {
        uint256 wasteAmount;
        uint256 timestamp;
    }
    
    // Mapping of user address to an array of their disposal events.
    mapping(address => DisposalEvent[]) private disposalHistory;
    
    // Reward ratio: number of tokens rewarded per unit of waste disposed.
    uint256 public rewardRatio;
    
    // Instance of the VerdiFi ERC20 Token contract.
    VerdiFiToken public token;
    
    event DisposalRecorded(address indexed user, uint256 wasteAmount, uint256 timestamp);
    event RewardTriggered(address indexed user, uint256 rewardAmount);
    event PlatformSettingsUpdated(uint256 newRewardRatio);
    
    // Constructor receives the address of the deployed token and an initial reward ratio.
    constructor(address tokenAddress, uint256 _rewardRatio) {
        token = VerdiFiToken(tokenAddress);
        rewardRatio = _rewardRatio;
    }
    
    // Logs a waste disposal event and triggers the corresponding reward.
    function recordDisposalEvent(address user, uint256 wasteAmount) external  {
        disposalHistory[user].push(DisposalEvent(wasteAmount, block.timestamp));
        emit DisposalRecorded(user, wasteAmount, block.timestamp);
        triggerReward(user, wasteAmount);
    }
    
    // Calculates and issues token rewards based on waste disposal.
    function triggerReward(address user, uint256 wasteAmount) public  {
        uint256 rewardAmount = wasteAmount * rewardRatio;
        // token.mint(user, rewardAmount);
        emit RewardTriggered(user, rewardAmount);
    }
    
    // Updates platform settings such as the reward ratio.
    function updatePlatformSettings(uint256 newRewardRatio) external  {
        rewardRatio = newRewardRatio;
        emit PlatformSettingsUpdated(newRewardRatio);
    }
    
    // Retrieves a user's waste disposal history.
    function getDisposalHistory(address user) external view returns (DisposalEvent[] memory) {
        return disposalHistory[user];
    }
}