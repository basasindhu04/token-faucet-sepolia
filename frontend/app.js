let faucet;

async function connect() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function claim() {
  await window.EVAL.requestTokens();
}

window.EVAL = {
  async requestTokens() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    faucet = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, signer);
    return faucet.requestTokens();
  }
};
