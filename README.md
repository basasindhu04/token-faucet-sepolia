# ERC20 Token Faucet – Sepolia Testnet

This repository contains an ERC20 token and a token faucet smart contract built using **Hardhat** and **Solidity**. The faucet allows users to claim tokens under controlled conditions such as cooldown periods and lifetime claim limits to prevent abuse. The contracts are deployed and verified on the **Ethereum Sepolia Testnet**.

---

## 🚀 Features

* **ERC20 Token** implemented using OpenZeppelin
* **Token Faucet** with:

  * Cooldown period between claims
  * Lifetime claim limit per address
  * Admin-controlled pause and unpause
* **Secure ownership** using OpenZeppelin `Ownable`
* **Unit tests** covering core logic and edge cases
* **Deployment to Sepolia testnet**
* **Verified smart contracts on Etherscan**

---

## 🛠️ Tech Stack

* **Solidity** (v0.8.x)
* **Hardhat**
* **OpenZeppelin Contracts**
* **Ethers.js**
* **Sepolia Testnet**
* **Infura** (RPC Provider)
* **Etherscan** (Contract Verification)

---

## 📂 Project Structure

```
contracts/          # Solidity smart contracts
  ├── Token.sol
  └── TokenFaucet.sol
scripts/            # Deployment scripts
  └── deploy.js
test/               # Hardhat test files
  └── TokenFaucet.test.js
hardhat.config.js   # Hardhat configuration
package.json        # Project dependencies
.gitignore          # Ignored files
README.md           # Project documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create environment variables

Create a `.env` file in the project root:

```env
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=0xyour_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **Never commit the `.env` file to GitHub**

---

## 🔨 Compile Contracts

```bash
npx hardhat compile
```

---

## 🧪 Run Tests

```bash
npx hardhat test
```

### Gas reporting

```bash
REPORT_GAS=true npx hardhat test
```

The tests validate:

* Token claim functionality
* Cooldown enforcement
* Lifetime claim limits
* Admin access control (pause/unpause)

---

## 🚀 Deployment (Sepolia Testnet)

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Deployment output includes:

* Token contract address
* Faucet contract address
* Mint permission assignment

---

## 🔍 Contract Verification (Etherscan)

### Token Contract

[https://sepolia.etherscan.io/address/0xb51F47743187F30e9bdcadFA55e2E131A360e60B](https://sepolia.etherscan.io/address/0xb51F47743187F30e9bdcadFA55e2E131A360e60B)

### Faucet Contract

[https://sepolia.etherscan.io/address/0xEb38b0DA0B7379F5b9d614F93A05Cf1cdc47C199](https://sepolia.etherscan.io/address/0xEb38b0DA0B7379F5b9d614F93A05Cf1cdc47C199)

Both contracts are fully verified and include Read/Write interfaces.

---

## 🔐 Security Considerations

* Access control enforced via `Ownable`
* Cooldown and lifetime limits prevent abuse
* Solidity 0.8+ prevents overflow/underflow
* Checks-effects-interactions pattern followed
* Only admin can pause/unpause faucet

---

## 📌 Network Information

* **Network:** Ethereum Sepolia Testnet
* **Chain ID:** 11155111

---

## 📄 License

This project is for educational purposes and follows the MIT License.

---

## ✅ Status

✔ Contracts Deployed
✔ Tests Passing
✔ Contracts Verified on Etherscan
✔ GitHub Repository Ready

---

## 👨‍💻 Author

**Manju Chollangi**
GitHub: [https://github.com/basasindhu04](https://github.com/basasindhu04)

---

⭐ If you found this project helpful, feel free to star the repository!
