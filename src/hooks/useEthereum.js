import { useState } from "react";
import abi from "../utils/GreetingPortal.json";
import { ethers } from "ethers";

export default function useEthereum() {
  const contractAddress = "0x27030F3d828750AE2eDC57E4A1c26E3909c4F904";
  const contractABI = abi.abi;

  const getEthereum = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const gContract = new ethers.Contract(contractAddress, contractABI, signer);
    return gContract;
  };

  return { getEthereum };
}
