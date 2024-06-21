export const decentraplace2 = [
	{
	  "type": "constructor",
	  "name": "",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "event",
	  "name": "AmountPixel",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "PixelAmount",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "GuestChanged",
	  "inputs": [
		{
		  "type": "address",
		  "name": "guest",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "NFTCompleted",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PixelChanged",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "x",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "TankRefilled",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "function",
	  "name": "NFTbalance",
	  "inputs": [
		{
		  "type": "address",
		  "name": "user",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "PIXEL_RANGE",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "accessPassPixel",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "x",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "amount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "colorTank",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "colored",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "cooldown",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "eventEnded",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "guestNFT",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "lastTankAquired",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "maxPixels",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "nextTankId",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "owner",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pixelAmount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pixelChanged",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "purchaseTime",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "time",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "purchaseTimeGuest",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "time",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "setGuestNFT",
	  "inputs": [
		{
		  "type": "address",
		  "name": "GuestNFT",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "timeFee",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "topOnchainArtUser",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalPixels",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "receive",
	  "name": "",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "payable"
	}
  ];