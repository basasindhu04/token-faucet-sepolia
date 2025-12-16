// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFaucet is Ownable {
    Token public token;

    uint256 public constant FAUCET_AMOUNT = 100 * 10 ** 18;
    uint256 public constant COOLDOWN_TIME = 1 days;
    uint256 public constant MAX_CLAIM_AMOUNT = 1000 * 10 ** 18;

    bool private paused;

    mapping(address => uint256) public lastClaimAt;
    mapping(address => uint256) public totalClaimed;

    event TokensClaimed(address indexed user, uint256 amount);
    event FaucetPaused(bool paused);

    constructor(address tokenAddress) Ownable(msg.sender) {
        token = Token(tokenAddress);
    }

    function requestTokens() external {
        require(!paused, "Faucet is paused");

        if (lastClaimAt[msg.sender] != 0) {
            require(
                block.timestamp - lastClaimAt[msg.sender] >= COOLDOWN_TIME,
                "Cooldown period not elapsed"
            );
        }

        require(
            totalClaimed[msg.sender] + FAUCET_AMOUNT <= MAX_CLAIM_AMOUNT,
            "Lifetime claim limit reached"
        );

        lastClaimAt[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += FAUCET_AMOUNT;

        token.mint(msg.sender, FAUCET_AMOUNT);

        emit TokensClaimed(msg.sender, FAUCET_AMOUNT);
    }

    function canClaim(address user) external view returns (bool) {
        if (paused) return false;
        if (totalClaimed[user] + FAUCET_AMOUNT > MAX_CLAIM_AMOUNT) return false;
        if (lastClaimAt[user] == 0) return true;
        return block.timestamp - lastClaimAt[user] >= COOLDOWN_TIME;
    }

    function remainingAllowance(address user) external view returns (uint256) {
        if (totalClaimed[user] >= MAX_CLAIM_AMOUNT) return 0;
        return MAX_CLAIM_AMOUNT - totalClaimed[user];
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit FaucetPaused(_paused);
    }

    function isPaused() external view returns (bool) {
        return paused;
    }
}
