let provider, signer, faucet;

const FAUCET_ADDRESS = "0xEb38b0DA0B7379F5b9d614F93A05Cf1cdc47C199";

const FAUCET_ABI = [
  "function requestTokens() external",
  "function paused() view returns (bool)"
];

async function connect() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  alert("Wallet connected: " + await signer.getAddress());
}

async function claim() {
  await window.EVAL.requestTokens();
}

window.EVAL = {
  async requestTokens() {
    faucet = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, signer);
    const tx = await faucet.requestTokens();
    await tx.wait();
    alert("Tokens claimed successfully!");
  }
};
