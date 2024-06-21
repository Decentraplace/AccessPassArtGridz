import React, { useState, useEffect, useCallback } from 'react';
import { useContract, useContractRead, Web3Button, useContractEvents, useAddress } from "@thirdweb-dev/react";
import { CompactPicker } from 'react-color';
import Registration from './BuyTime.js';
import './Canvas.css'; // Import your CSS stylesheet
import { ethers } from 'ethers';
import { decentraplace2 } from "./abi2.js";
import { motion } from "framer-motion";
import PixelDyeTimePurchaseComponent from './BuyTime.js';

const CONTRACT_ADDRESS = "0xdE0BF45341463F4907fA440CC992CCc175E94D2c"; // Replace with your contract address

export default function ColorPixels() {
  const { contract } = useContract(CONTRACT_ADDRESS,decentraplace2);
  const address = useAddress();
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 1, y: 1 });
  const [hoveredPixel, setHoveredPixel] = useState({ x: null, y: null });
  const [clickedPixel, setClickedPixel] = useState({ x: null, y: null });
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const { data: burned, isLoading: burnedLoad } = useContractRead(contract, "colored");
  const { data: grid, isLoading: gridLoad } = useContractRead(contract, "guestNFT");
  const { data: mined, isLoading: minedLoad } = useContractRead(contract, "totalPixels",[address]);
  const WINDOW_SIZE = 100;
  const MAP_SIZE = 100;
  const [reloadKey, setReloadKey] = useState(0);
  const [fee, setFee] = useState(0);
  const [pixelColors, setPixelColors] = useState(Array(WINDOW_SIZE * WINDOW_SIZE).fill(0));
  const [latestCanvasSize, setLatestCanvasSize] = useState(WINDOW_SIZE);
  const [canvasSize, setCanvasSize] = useState(2);


  // Use the ThirdWeb useContractEvents hook to listen for "PixelChanged" events
  const { data: pixelChangedEvents = [], error: pixelChangedEventsError } = useContractEvents(contract, "PixelChanged", {
    queryFilter: {
      fromBlock: 3912450, // Events starting from this block
      toBlock: 'latest', // Events up to this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });

  useEffect(() => {
    const newPixelColors = Array(WINDOW_SIZE * WINDOW_SIZE).fill(0);
  
    for (const event of pixelChangedEvents) {
      const { x, y, color } = event.data;
      const relativeX = x - windowPosition.x;
      const relativeY = y - windowPosition.y;
      if (relativeX >= 0 && relativeX < WINDOW_SIZE && relativeY >= 0 && relativeY < WINDOW_SIZE) {
        const pixelIndex = relativeY * WINDOW_SIZE + relativeX;
        newPixelColors[pixelIndex] = color;
      }
    }
    setPixelColors(newPixelColors);
  }, [pixelChangedEvents, windowPosition, WINDOW_SIZE]);
  

  const decimalToHex = (decimalColor) => {
    return "#" + (decimalColor & 0x00FFFFFF).toString(16).padStart(6, '0');
  };

  const hexToDecimal = (hexColor) => {
    return parseInt(hexColor.replace(/^#/, ''), 16);
  };

  const handlePixelClick = useCallback((x, y) => {
    setClickedPixel({ x, y });
  }, []);

  const handlePixelHover = useCallback((x, y) => {
    setHoveredPixel({ x, y });
  }, []);

  const { data: dataPainter, error: dataPainterError } = useContractRead(
    contract,
    "pixelChanged",
    [hoveredPixel.x, hoveredPixel.y]
  );



  if (dataPainterError || dataPainter === "0x0000000000000000000000000000000000000000") {
    console.error("Error fetching dataPainter", dataPainterError);
  }

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

 
  
  

  const renderCanvas = () => {
    const canvas = [];
    const adjustedPixelSize = Math.min(300, 300 / 40);

    for (let y = 1; y <= WINDOW_SIZE; y++) {
      const row = [];
      for (let x = 1; x <= WINDOW_SIZE; x++) {
        const pixelIndex = (y - 1) * WINDOW_SIZE + (x - 1);
        const posX = windowPosition.x + x - 1;
        const posY = windowPosition.y + y - 1;
        const decimalColor = pixelColors[pixelIndex];
        const color = decimalToHex(decimalColor);

        const pixelStyle = {
          width: `${adjustedPixelSize}px`,
          height: `${adjustedPixelSize}px`,
          backgroundColor: color,
        };

        row.push(
          <motion.div
            key={`${pixelIndex}-${decimalColor}`}
            className="pixelOnchain"
            style={pixelStyle}
            onMouseEnter={() => handlePixelHover(posX, posY)}
            onClick={() => handlePixelClick(posX, posY)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        );
      }
      canvas.push(<div key={y} className="row">{row}</div>);
    }

    return <div className="canvas">{canvas}</div>;
  };

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (contract && address) {
        // Call the contract method to get the registration timestamp
        const data = await contract.call("colorTank", [address]);

        // Get the current Unix timestamp
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Check if the current timestamp is smaller than the returned timestamp
        if (currentTimestamp < data) {
          setIsUserRegistered(true);
        } else {
          setIsUserRegistered(false);
        }
      }
    };

    checkUserRegistration();
  }, [contract, address]);

  if (isUserRegistered) {
  return (
      <div
      style={{marginTop:'3vh'}} className="canvas-container">
        <div className="display-container">
        <div className="element">
              {burnedLoad ? (
                <p className="loading">Loading accumulated Fees...</p>
              ) : (
                <div>
                  <p className="data2">Pixels left: </p>
                  <p className='data4'>{10000-burned.toNumber()}</p>
                </div>
              )}
            </div>
        <div className="element">
            {minedLoad ? (
              <p className="loading">Loading accumulated burned AGZ...</p>
            ) : (
              <div>
              <p className="data2">Colored by you:</p>
             <p className='data4'> {mined.toNumber()}</p>
             </div>
            )}
          </div>
          <div className="element">
            {minedLoad ? (
              <p className="loading">Loading accumulated burned AGZ...</p>
            ) : (
              <div>
              <p className="data2">cooldown period:</p>
             <p className='data4'> 10 seconds</p>
             </div>
            )}
          </div>
          <div className="element1">
            <div className="data2">painter of X{hoveredPixel.x}|Y{hoveredPixel.y}
            </div>
            <div className="data4">
              {dataPainter}
            </div>
          </div>
        </div>

        <div className="pixel-canvas" key={reloadKey}>
          {renderCanvas()}
          <div>
      
              <p className="data3">Canvas Size:40 x 40</p>
          
          </div>
        </div>
        <div className='side-panel'>
          <div className="color-picker">
            <CompactPicker
              color={selectedColor}
              onChangeComplete={handleColorChange}
            />

            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              className="action"
              action={(contract) =>
                contract.call(
                  "accessPassPixel",
                  [clickedPixel.x, clickedPixel.y, hexToDecimal(selectedColor)],
                  
                )
              }
              onError={(error) => alert("Pixel already colored, no time left or cooldown time not passed!")}
              >
              {clickedPixel.x !== null && (
                <div className="clicked-pixel-card">
                  <p>
                    X{clickedPixel.x}|Y{clickedPixel.y}</p>
                </div>
              )}
              <h3>color the ACCESSPASS</h3>
           

            </Web3Button>
          </div>
          <div className="color-picker">
           <PixelDyeTimePurchaseComponent/>
          </div>
        </div>
      </div>
    
  );}
  else {
    // Render the registration step
    return (
      <div>
        <Registration/>
      </div>
    );
  }
}
