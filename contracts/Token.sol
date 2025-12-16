// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 public immutable MAX_SUPPLY;
    address public faucet;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_
    )
        ERC20(name_, symbol_)
        Ownable(msg.sender)
    {
        MAX_SUPPLY = maxSupply_;
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
