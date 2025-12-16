const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  // 1️⃣ Deploy Token (WITH constructor arguments)
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(
    "Faucet Token",
    "FTK",
    hre.ethers.parseEther("1000000")
  );
  await token.waitForDeployment();

  console.log("✅ Token deployed to:", token.target);

  // 2️⃣ Deploy Faucet
  const Faucet = await hre.ethers.getContractFactory("TokenFaucet");
  const faucet = await Faucet.deploy(token.target);
  await faucet.waitForDeployment();

  console.log("✅ Faucet deployed to:", faucet.target);

  // 3️⃣ Set faucet as minter
  const tx = await token.setFaucet(faucet.target);
  await tx.wait();

  console.log("✅ Faucet granted mint permission");

  console.log("\n🎯 DEPLOYMENT COMPLETE");
  console.log("Token Address:", token.target);
  console.log("Faucet Address:", faucet.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
