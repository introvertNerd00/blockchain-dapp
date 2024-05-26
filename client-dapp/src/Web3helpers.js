import Web3 from "web3";
import Auth from "./assets/contracts_json/Auth.json";

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access:", error);
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const loadBlockchainData = async () => {
  await loadWeb3();
  const web3 = window.web3;

  // Load account
  const accounts = await web3.eth.getAccounts();

  // Network ID
  const networkId = await web3.eth.net.getId();
  console.log(`Network ID: ${networkId}`);

  // Check if the network ID exists in the Auth.networks object
  if (Auth.networks[networkId]) {
    const auth = new web3.eth.Contract(
      Auth.abi,
      Auth.networks[networkId].address
    );
    return { auth, accounts: accounts[0] };
  } else {
    console.error(`Smart contract not deployed to network ID ${networkId}.`);
    return { auth: null, accounts: accounts[0] };
  }
};
