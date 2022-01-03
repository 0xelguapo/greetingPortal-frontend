import { useState } from "react";
import useEthereum from "./useEthereum";

export default function useGreet() {
  const { getEthereum } = useEthereum();
  const [greetingInfo, setGreetingInfo] = useState({
    name: "",
    message: "",
  });
  const [allGreetings, setAllGreetings] = useState([]);

  const handleChange = (e) => {
    setGreetingInfo({
      ...greetingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const getAllGreetings = async () => {
    try {
      const { ethereum } = window;
      let greetingsCleaned = [];
      if (ethereum) {
        const greetContract = await getEthereum(ethereum);
        const greetings = await greetContract.getAllGreetings();

        greetingsCleaned = [];
        greetings.forEach((greeting) => {
          greetingsCleaned.push({
            address: greeting.greeter,
            name: greeting.name,
            message: greeting.message,
            timestamp: new Date(greeting.timestamp * 1000),
          });
        });
        return greetingsCleaned.reverse();
      }
      setAllGreetings(greetingsCleaned);
      console.log("greetingsCleaned", greetingsCleaned);
    } catch (err) {
      console.log("eth object doesn't exist!");
    }
  };

  const greet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const greetContract = await getEthereum(ethereum);
        // the actual greeting from smart contract below
        const greetTxn = await greetContract.greet(
          greetingInfo.name,
          greetingInfo.message
        );
        console.log("Mining...", greetTxn.hash);

        await greetTxn.wait();
        console.log("Mined --", greetTxn.hash);

        let count = await greetContract.getTotalGreetings();
        
        await window.location.reload();
        console.log("New total wave count...", count.toNumber());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { allGreetings, getAllGreetings, greet, handleChange };
}
