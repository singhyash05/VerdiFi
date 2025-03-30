// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VerdiFiRegistry {
    // Define roles as an enum.
    enum Role { None, WasteDisposer, RecyclingCompany, ServiceProvider }

    struct Entity {
        Role role;
        string organizationName;  // Organization name; leave as "" if not applicable.
        string displayName;       // Another name or display name; leave as "" if not applicable.
        uint256 phoneNumber;      // Contact phone number; use 0 if not applicable.
        string email;             // Contact email; leave as "" if not applicable.
        bool verified;
    }
    
    // Government verifier address (e.g., a multisig wallet) // Multiverifiers....
    address public verifier;
    
    // Registration fee required to register an entity (in wei)
    uint256 public registrationFee;

    mapping(address => Entity) private entities;
    
    event EntityRegistered(
        address indexed entity,
        Role role,
        string organizationName,
        string displayName,
        uint256 phoneNumber,
        string email
    );
    event EntityVerified(address indexed entity, bool verified);
    event EntityRemoved(address indexed entity, string reason);

    // Modifier to restrict functions to only the verifier.
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Not authorized: Only verifier allowed");
        _;
    }
    
    // Set the verifier address and registration fee during deployment.
    constructor(address _verifier, uint256 _registrationFee) {
        verifier = _verifier;
        registrationFee = _registrationFee;
    }
    
    // Allows the owner to update the registration fee.
    function updateRegistrationFee(uint256 newFee) external onlyVerifier {
        registrationFee = newFee;
    }
    
    // Registers a new entity with its role and additional details.
    // The caller must send at least registrationFee; if a field is not applicable, pass an empty string or 0.
    function registerEntity(
        address entity, 
        Role role, 
        string memory organizationName, 
        string memory displayName, 
        uint256 phoneNumber,
        string memory email
    ) external payable {
        require(msg.value >= registrationFee, "Insufficient registration fee");        
        entities[entity] = Entity(role, organizationName, displayName, phoneNumber, email, false);
        emit EntityRegistered(entity, role, organizationName, displayName, phoneNumber, email);
    }
    
    // Retrieves the details of a registered entity.
    function getEntityDetails(address entity) public view returns (
        Role role, 
        string memory organizationName, 
        string memory displayName, 
        uint256 phoneNumber,
        string memory email,
        bool verified
    ) {
        Entity memory ent = entities[entity];
        return (ent.role, ent.organizationName, ent.displayName, ent.phoneNumber, ent.email, ent.verified);
    }
    
    // Verifies an entity (only callable by the verifier).
    function verifyEntity(address entity, bool status) external onlyVerifier {
        entities[entity].verified = status;
        emit EntityVerified(entity, status);
    }
    
    // Removes an entity if it fails verification (only callable by the verifier).
    // Provides a reason for removal.
    function removeEntity(address entity, string memory reason) external onlyVerifier {
        delete entities[entity];
        emit EntityRemoved(entity, reason);
    }
    // functionality to retrieve fees in contract used by govt. (like a tax)
}
