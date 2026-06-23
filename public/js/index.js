"use strict";

(() => {
  let userAddress = null;
  let connect = document.querySelector("#wallet-connect");

//   connectWallet();

  connect.addEventListener("click", async () => {
    connectWallet();
  });

  const mintBtn = document.querySelector("#mint-button");
  if (mintBtn) {
    mintBtn.addEventListener("click", () => {
      if (!userAddress) {
        connect.click();
        return;
      }
      document.querySelector("#modal-project-name").textContent = mintBtn.dataset.name;
      document.querySelector("#modal-price").textContent = mintBtn.dataset.price;
      document.querySelector("#modal-wallet").textContent =
        userAddress.substring(0, 6) + "..." + userAddress.substring(38, 42);
      document.querySelector("#modal-status").style.display = "none";
      const confirmBtn = document.querySelector("#confirm-mint-btn");
      confirmBtn.disabled = false;
      confirmBtn.textContent = "Confirm";
      new bootstrap.Modal(document.getElementById("mint-modal")).show();
    });

    document.querySelector("#confirm-mint-btn").addEventListener("click", () => {
      const confirmBtn = document.querySelector("#confirm-mint-btn");
      const status = document.querySelector("#modal-status");
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Submitting...";
      setTimeout(() => {
        status.style.display = "block";
        status.textContent = "Transaction submitted! Your mint is pending confirmation.";
        confirmBtn.textContent = "Submitted";
      }, 1500);
    });
  }

  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      connect.innerHTML = "No Wallet Found";
      console.error("No Ethereum wallet detected. Please install MetaMask.");
      return;
    }

    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((data) => {
        userAddress = data[0];
        let walletString =
          userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
        connect.innerHTML = walletString;
        return userAddress;
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect a wallet.");
        } else {
          console.error(err);
        }
      });
  }
})();
