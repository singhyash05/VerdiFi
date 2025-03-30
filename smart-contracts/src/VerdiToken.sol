// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VerdiFiToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("VerdiFi Token", "VDF") {
        _mint(msg.sender, initialSupply);
    }

    // function mint(address to, uint256 amount) external onlyOwner {
    //     _mint(to, amount);
    // }
}