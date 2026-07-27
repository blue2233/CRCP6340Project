// "use strict";

// (() => {
//   let userAddress = null;
//   let connect = document.querySelector("#wallet-connect");

// //   connectWallet();

//   connect.addEventListener("click", async () => {
//     connectWallet();
//   });

//   const mintBtn = document.querySelector("#mint-button");
//   if (mintBtn) {
//     mintBtn.addEventListener("click", () => {
//       if (!userAddress) {
//         connect.click();
//         return;
//       }
//       document.querySelector("#modal-project-name").textContent = mintBtn.dataset.name;
//       document.querySelector("#modal-price").textContent = mintBtn.dataset.price;
//       document.querySelector("#modal-wallet").textContent =
//         userAddress.substring(0, 6) + "..." + userAddress.substring(38, 42);
//       document.querySelector("#modal-status").style.display = "none";
//       const confirmBtn = document.querySelector("#confirm-mint-btn");
//       confirmBtn.disabled = false;
//       confirmBtn.textContent = "Confirm";
//       new bootstrap.Modal(document.getElementById("mint-modal")).show();
//     });

//     document.querySelector("#confirm-mint-btn").addEventListener("click", () => {
//       const confirmBtn = document.querySelector("#confirm-mint-btn");
//       const status = document.querySelector("#modal-status");
//       confirmBtn.disabled = true;
//       confirmBtn.textContent = "Submitting...";
//       setTimeout(() => {
//         status.style.display = "block";
//         status.textContent = "Transaction submitted! Your mint is pending confirmation.";
//         confirmBtn.textContent = "Submitted";
//       }, 1500);
//     });
//   }

//   async function connectWallet() {
//     if (typeof window.ethereum === "undefined") {
//       connect.innerHTML = "No Wallet Found";
//       console.error("No Ethereum wallet detected. Please install MetaMask.");
//       return;
//     }

//     await window.ethereum
//       .request({ method: "eth_requestAccounts" })
//       .then((data) => {
//         userAddress = data[0];
//         let walletString =
//           userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
//         connect.innerHTML = walletString;
//         return userAddress;
//       })
//       .catch((err) => {
//         if (err.code === 4001) {
//           // EIP-1193 userRejectedRequest error
//           // If this happens, the user rejected the connection request.
//           console.log("Please connect a wallet.");
//         } else {
//           console.error(err);
//         }
//       });
//   }
// })();


import { ethers } from "./ethers-5.2.esm.js";
import { contractABI } from "./contractABI.js";
import "./ejs.js";

("use strict");

export let provider = null;
export let signer = null;
export let userAddress = null;
export let contractList = document
  .querySelector("#contracts")
  .innerHTML.split(",");
export let mintList = document.querySelector("#mints").innerHTML.split(",");
export let projectList = JSON.parse(
  document.querySelector("#projects").innerHTML
);
export let isConnected = false;



let connect = document.querySelector("#wallet-connect");

await connectWallet();
document.querySelector("#mints").innerHTML = mintList;
connect.addEventListener("click", async () => {
  connectWallet();
});
if (isConnected) {
  await updateMints();
}

// let connect = document.querySelector("#wallet-connect");
// await connectWallet();
// document.querySelector("#mints").innerHTML = mintList;
// connect.addEventListener("click", async () => {
//   connectWallet();
// });
// if (isConnected) {
//   await updateMints();
// }

// Without this, switching the active account inside MetaMask (rather than
// reconnecting through the page) leaves userAddress/the wallet button
// pointing at whichever account was connected last, even though MetaMask
// now shows a different account as active and not yet authorized for this
// site. See scratch/bug-tracker.md - "Wallet button shows stale address
// after switching MetaMask accounts".
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      userAddress = null;
      isConnected = false;
      connect.innerHTML = "Connect Wallet";
    } else {
      userAddress = accounts[0];
      connect.innerHTML =
        userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
    }
  });
}

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      connect.innerHTML = "Connected";
      provider = new ethers.providers.Web3Provider(window.ethereum); // ethers = engine beneath the hood of hardhat that allows us to interact using JavaScript to interact with the RPC node of the Ethereum network
      signer = provider.getSigner();
      const accounts = await ethereum.request({ method: "eth_accounts" });
      userAddress = "" + accounts[0];
      console.log("userAddress: ", userAddress);
      let walletString =
        userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
      connect.innerHTML = walletString;
      console.log("provider: ", provider);
      console.log("wallet: ", userAddress);
      console.log("signer: ", signer);
      isConnected = true;
    } catch (error) {
      connect.innerHTML = "Check Metamask";
      isConnected = false;
    }
  } else {
    connect.innerHTML = "Please connect MetaMask";
    isConnected = false;
  }
}

export async function updateMints() {
  let newList = [];
  for (let i = 0; i < contractList.length; i++) {
    let contractAddress = contractList[i];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    contract.connect(signer);
    let num = await contract.totalSupply(); // total supply function returns the # of tokens that have been minted
    newList.push(num.toString());
  }
  mintList = [...newList];
}