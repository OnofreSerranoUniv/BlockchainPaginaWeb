// src/useContract.js
import { useMemo } from "react";
import { ethers } from "ethers";
import abi from "./abis/TravelPassAdvanced.json";

export function useContract(signer) {
  const address = import.meta.env.VITE_CONTRACT_ADDRESS;
  return useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(address, abi, signer);
  }, [signer]);
}
