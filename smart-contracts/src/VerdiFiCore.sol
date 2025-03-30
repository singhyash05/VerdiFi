// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {VerdiFiToken} from "./VerdiToken.sol";
import {VerdiFiRegistry} from "./VerdiFiRegistry.sol";

contract VerdiFiCore is VerdiFiRegistry {
    struct DisposalEvent {
        uint256 wasteAmount;
        uint256 timestamp;
    }
    
    // Mapping of user address to an array of their disposal events.
    mapping(address => DisposalEvent[]) private disposalHistory;
    
    // Reward ratio: number of tokens rewarded per unit of waste disposed.
    uint256 public rewardRatio;
    
    // Instance of the VerdiFi ERC20 Token contract.
    VerdiFiToken public verdifiToken;
    
    event DisposalRecorded(address indexed user, uint256 wasteAmount, uint256 timestamp);
    event RewardTriggered(address indexed user, uint256 rewardAmount);
    event PlatformSettingsUpdated(uint256 newRewardRatio);
    
    // Constructor receives the address of the deployed token, an initial reward ratio, verifier address, and registration fee.
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
    function recordDisposalEvent(address user, uint256 wasteAmount) external {
        // Retrieve details from the registry.
        // Using getEntityDetails returns a tuple:
        // (Role role, string memory organizationName, string memory displayName, uint256 phoneNumber, string memory email, bool verified)
        (, , , , , bool verified) = getEntityDetails(user);
        require(verified, "User is not verified or not registered on the protocol");
        
        disposalHistory[user].push(DisposalEvent(wasteAmount, block.timestamp));
        emit DisposalRecorded(user, wasteAmount, block.timestamp);
        triggerReward(user, wasteAmount);
    }
    
    // Calculates and issues token rewards based on waste disposal.
    function triggerReward(address user, uint256 wasteAmount) internal {
        uint256 rewardAmount = wasteAmount * rewardRatio;
        // Uncomment the following line once minting functionality is enabled in VerdiFiToken.
        // verdifiToken.mint(user, rewardAmount);
        emit RewardTriggered(user, rewardAmount);
    }
    
    // Updates platform settings such as the reward ratio.
    function updatePlatformSettings(uint256 newRewardRatio) external onlyVerifier {
        rewardRatio = newRewardRatio;
        emit PlatformSettingsUpdated(newRewardRatio);
    }
    
    // Retrieves a user's waste disposal history.
    function getDisposalHistory(address user) external view returns (DisposalEvent[] memory) {
        return disposalHistory[user];
    }
}
