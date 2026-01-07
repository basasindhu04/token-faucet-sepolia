const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Faucet", function () {
  let token, faucet;
  let owner, user;

  const FAUCET_AMOUNT = ethers.parseEther("100");
  const DAY = 24 * 60 * 60;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.waitForDeployment();

    const Faucet = await ethers.getContractFactory("TokenFaucet");
    faucet = await Faucet.deploy(await token.getAddress());
    await faucet.waitForDeployment();

    await token.setFaucet(await faucet.getAddress());
  });

  it("Allows user to claim tokens", async function () {
    await faucet.connect(user).requestTokens();
    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(FAUCET_AMOUNT);
  });

  it("Prevents claim during cooldown", async function () {
    await faucet.connect(user).requestTokens();

    await expect(
      faucet.connect(user).requestTokens()
    ).to.be.revertedWith("Cooldown period not elapsed");
  });

  it("Allows claim after cooldown", async function () {
    await faucet.connect(user).requestTokens();

    await ethers.provider.send("evm_increaseTime", [DAY]);
    await ethers.provider.send("evm_mine");

    await faucet.connect(user).requestTokens();
    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(FAUCET_AMOUNT * 2n);
  });

  it("Enforces lifetime limit", async function () {
    for (let i = 0; i < 10; i++) {
      await faucet.connect(user).requestTokens();
      await ethers.provider.send("evm_increaseTime", [DAY]);
      await ethers.provider.send("evm_mine");
    }

    await expect(
      faucet.connect(user).requestTokens()
    ).to.be.revertedWith("Lifetime claim limit reached");
  });

  it("Admin can pause and unpause faucet", async function () {
    await faucet.setPaused(true);

    await expect(
      faucet.connect(user).requestTokens()
    ).to.be.revertedWith("Faucet is paused");

    await faucet.setPaused(false);
    await faucet.connect(user).requestTokens();
  });

  it("Non-admin cannot pause faucet", async function () {
    await expect(
      faucet.connect(user).setPaused(true)
    ).to.be.reverted;
  });
});
