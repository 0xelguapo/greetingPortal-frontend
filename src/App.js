import React, { useState } from "react";
import useWallet from "./hooks/useWallet.js";
import useGreet from "./hooks/useGreet.js";
import NavBar from "./components/NavBar";
import "./App.css";

export default function App() {
  const { newGreetingState, currentAccount, connectWallet } = useWallet();
  const { allGreetings, greet, handleChange } = useGreet();

  return (
    <>
      <NavBar />
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">👋 Hey there!</div>

          <div className="bio">
            <p>My name is elguapo and I'm a builder.</p>
            <p>Connect your wallet to send me a message on <span style={{fontWeight: "bold"}}>Rinkeby Test Network!</span></p>
          </div>

          <div className="greetingForm">
            <input placeholder="Your name / alias" name="name" onChange={handleChange} />
            <textarea className="message" name="message" placeholder="Send a message..." onChange={handleChange} />
          </div>
          <button className="waveButton" onClick={greet} disabled={!currentAccount}>
            Send a Greeting!
          </button>
          {!currentAccount && (
            <p className="helper">
              Connect to Rinkeby Test Network to Interact!
            </p>
          )}
          <div className="greetingContainer">
            <h3 className="greetingsTitle">----- Greetings from Everyone -----</h3>
            {newGreetingState &&
              newGreetingState.map((greeting, index) => (
                <div key={index} className="greeting">
                  <div className="greetingName">{greeting.name}</div>
                  <div className="greetingMessage">{greeting.message}</div>
                  <div className="greetingBottom">
                    <div className="greetingAddress">{greeting.address}</div>
                    <div className="greetingTime">
                      {greeting.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
