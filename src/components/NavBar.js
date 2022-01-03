import React from "react";
import useWallet from "../hooks/useWallet.js";
import "../App.css";

export default function NavBar() {
  const { currentAccount, connectWallet } = useWallet();

  return (
    <div className="navContainer">
      <div className="requestEth">
        <a href="https://faucets.chain.link/rinkeby" target="_blank" rel="noopener noreferrer">Need Rinkeby Eth?</a>
      </div>
      {currentAccount ? (
        <>
          <div className="walletAddress">Wallet Connected <span role="img" aria-label="check">✅</span></div>
        </>
      ) : (
        <button className="connectButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
