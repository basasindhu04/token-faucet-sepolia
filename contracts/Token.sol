// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 public immutable MAX_SUPPLY;
    address public faucet;

    constructor() ERC20("Faucet Token", "FTK") Ownable(msg.sender) {
        MAX_SUPPLY = 1_000_000 * 10 ** decimals();
        _mint(msg.sender, MAX_SUPPLY);
    }

    function setFaucet(address _faucet) external onlyOwner {
        faucet = _faucet;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == faucet, "Only faucet can mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }
}
