import{ useState, useEffect } from "react";
import useGreet from './useGreet';

export default function useWallet() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [newGreetingState, setNewGreetingState] = useState();
  const { getAllGreetings } = useGreet();

  const checkWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("we have the ethereum object", ethereum);
      }
      //check to see if user has provided access
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        await setCurrentAccount(account);
        const allGreetings = await getAllGreetings();
        setNewGreetingState(allGreetings);
        console.log("allGreetings", allGreetings);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      await window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return { newGreetingState ,currentAccount, connectWallet };
}
