// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VerdiFiToken is ERC20 {
    //Minted By Governence (Protocol) and are owned by Deployer of Protocol which later on will be transfered to IOT Devices ....explain this
    constructor(uint256 initialSupply, address _verifier) ERC20("VerdiFi Token", "VDF") {
        _mint(_verifier, initialSupply);
    }

}