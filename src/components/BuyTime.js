import React, { useState, useEffect } from 'react';
import { useContract, Web3Button, useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { decentraplace2 } from "./abi2.js";
import '../tailwind.css';

const CONTRACT_ADDRESS = "0xdE0BF45341463F4907fA440CC992CCc175E94D2c";
const timeFee = ethers.utils.parseEther("0.001"); // 0.001 ethers

const PixelDyeTimePurchaseComponent = () => {
  const { contract } = useContract(CONTRACT_ADDRESS,decentraplace2);
  const userAddress = useAddress();

  const [isLoading, setIsLoading] = useState(false);
  const [guestNFT, setGuestNFT] = useState("");
  const [time, setTime] = useState(0);
  const [hasGuestNFT, setHasGuestNFT] = useState(false);
  const [colorTank, setColorTank] = useState(0);

  useEffect(() => {
    const fetchGuestNFT = async () => {
      try {
        const nftAddress = await contract.call("guestNFT");
        setGuestNFT(nftAddress);
      } catch (error) {
        console.error("Error fetching guest NFT address:", error);
      }
    };

    fetchGuestNFT();
  }, [contract]);

  useEffect(() => {
    const fetchColorTank = async () => {
      try {
        const tank = await contract.call("colorTank", [userAddress]);
        setColorTank(tank.toNumber());
      } catch (error) {
        console.error("Error fetching color tank:", error);
      }
    };

    if (userAddress) {
      fetchColorTank();
    }
  }, [contract, userAddress]);

  const handlePurchaseTime = async () => {
    try {
      setIsLoading(true);
      const isGuest = await contract.call("NFTbalance",[userAddress]);

      if (isGuest.toNumber() > 0) {
        setHasGuestNFT(true);
        await contract.call("purchaseTimeGuest", [time], {
          from: userAddress,
          value: ethers.utils.parseEther((0.001 * time).toString()),
        });
      } else {
        await contract.call("purchaseTime", [time], {
          from: userAddress,
          value: ethers.utils.parseEther((0.001 * time).toString()),
        });
      }
    } catch (error) {
      console.error("Error purchasing time:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-full w-full border-t-8 border-indigo-800">
    <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">⌛refill your colortank with time</h2>
    
    <div className="mb-6">
      <label className="block text-gray-800 font-semibold mb-2">0.001ETH per Unit (1 unit = 5 min):</label>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition duration-150 ease-in-out"
      />
    </div>
    
    <div className="text-center mb-6">
      <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 transition duration-150 ease-in-out"
        action={handlePurchaseTime}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Purchase Time"}
      </Web3Button>
    </div>
    
    <div className="mt-4">
    <p className="text-gray-800">
  <h1 style={{fontWeight:'bold'}}>color tank expiry: </h1>{colorTank === 0 ? 'no time left' : new Date(colorTank * 1000).toLocaleString()}
</p>

      {hasGuestNFT && <div><p className="text-gray-800"><h1 style={{fontWeight:'bold'}}>guest NFT detected: </h1> enjoy 2x time (1 unit = 10 min) </p>
      </div>}
    </div>
  </div>
  
  );
};

export default PixelDyeTimePurchaseComponent;
