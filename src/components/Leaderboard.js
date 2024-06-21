import React, { useEffect, useState } from 'react';
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { decentraplace2 } from "./abi2.js";
import './Leaderboard.css'; // Import the CSS stylesheet

const CONTRACT_ADDRESS = "0xdE0BF45341463F4907fA440CC992CCc175E94D2c";

export default function Leaderboard() {
  const { contract } = useContract(CONTRACT_ADDRESS, decentraplace2);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Use the ThirdWeb useContractEvents hook to listen for "AmountPixel" events
  const { data: amountPixelEvents = [] } = useContractEvents(contract, "AmountPixel", {
    queryFilter: {
      fromBlock: 3912450, // Events starting from this block
      toBlock: 'latest', // Events up to this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });

  useEffect(() => {
    const updateLeaderboard = () => {
      const newLeaderboard = {};

      for (const event of amountPixelEvents) {
        const { sender, PixelAmount } = event.data;
        if (newLeaderboard[sender]) {
          newLeaderboard[sender] += PixelAmount.toNumber();
        } else {
          newLeaderboard[sender] = PixelAmount.toNumber();
        }
      }

      const sortedLeaderboard = Object.entries(newLeaderboard)
        .sort(([, a], [, b]) => b - a);
      setLeaderboard(sortedLeaderboard);
    };

    updateLeaderboard();
  }, [amountPixelEvents]);

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedItems = leaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ol>
        {displayedItems.map(([address, amount], index) => (
          <li key={index}>
            {address}: {amount} pixels
          </li>
        ))}
      </ol>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
