// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//
// Contract 2: VerdiFi Registry Contract
//
contract VerdiFiRegistry {
    struct Entity {
        string role;
        string metadata; // e.g., company name, contact info
        bool verified;
    }
    
    mapping(address => Entity) private entities;
    
    event EntityRegistered(address indexed entity, string role, string metadata);
    event EntityRoleUpdated(address indexed entity, string newRole);
    event EntityVerified(address indexed entity, bool verified);

    // Registers a new entity with its role and additional metadata.
    function registerEntity(address entity, string memory role, string memory metadata) external  {
        entities[entity] = Entity(role, metadata, false);
        emit EntityRegistered(entity, role, metadata);
    }
    
    // Updates the role for an existing entity.
    function updateEntityRole(address entity, string memory newRole) external  {
        entities[entity].role = newRole;
        emit EntityRoleUpdated(entity, newRole);
    }
    
    // Retrieves the details of a registered entity.
    function getEntityDetails(address entity) external view returns (string memory role, string memory metadata, bool verified) {
        Entity memory ent = entities[entity];
        return (ent.role, ent.metadata, ent.verified);
    }
    
    // Verifies or flags an entity for compliance.
    function verifyEntity(address entity, bool status) external  {
        entities[entity].verified = status;
        emit EntityVerified(entity, status);
    }
}