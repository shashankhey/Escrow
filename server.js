const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post("/abc", async (req, res) => {
  const { productId, seller, quantity, price } = req.body;
  require("dotenv").config();
  const { Web3 } = require("web3");

  // Set up a connection to the DeFiChain node
  const web3 = new Web3("https://dmc.mydefichain.com/testnet");

  // Replace with the address of your deployed smart contract
  const contractAddress = "0x89B4d6fC92BaA69C5cf02DE40B52842ab4cf95E2";

  // Replace with your contract ABI (Application Binary Interface)
  const contractABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "cancelOrder",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "checkExpiry",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "confirmDelivery",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_productId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "_seller",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_quantity",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "createOrder",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "makePayment",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "currentOrderId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "orderMapping",
      outputs: [
        {
          internalType: "uint256",
          name: "productId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "buyer",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "seller",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isPaid",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "isDelivered",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "creationTime",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Example: Send a transaction to a state-changing function
  const account = process.env.ACCOUNT_ADDRESS; // Replace with your account address
  const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
  const createOrder = async (productId, seller, quantity, price) => {
    const PRICE = 1000000000000000000 * price;
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 2000000; // Adjust gas limit accordingly
      const data = contract.methods
        .createOrder(productId, seller, quantity, PRICE)
        .encodeABI();

      //Get current order Id
      let currentOrderId;

      contract.methods
        .currentOrderId()
        .call()
        .then((result) => {
          currentOrderId = result;
          console.log("Current Order ID:", currentOrderId);
        })
        .catch((error) => {
          console.error("Error getting current order ID:", error);
        });

      const transactionObject = {
        from: account,
        to: contractAddress,
        gas: gasLimit,
        gasPrice: gasPrice,
        data,
      };

      console.log("here1");
      const signedTransaction = await web3.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );
      console.log("here2");
      const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      console.log("here3");
      console.log("Order created. Transaction receipt:", receipt);

      const newData = contract.methods.makePayment(currentOrderId).encodeABI();

      const newTransactionObject = {
        from: account,
        to: contractAddress,
        gas: gasLimit,
        gasPrice: gasPrice,
        data: newData,
        value: PRICE,
      };

      console.log("here4");
      const newSignedTransaction = await web3.eth.accounts.signTransaction(
        newTransactionObject,
        privateKey
      );
      console.log("here5");
      const newReceipt = await web3.eth.sendSignedTransaction(
        newSignedTransaction.rawTransaction
      );

      console.log("here6");
      console.log("Order created. Transaction new receipt:", newReceipt);
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      return false;
    }
  };
  let transaction_Res = await createOrder(productId, seller, quantity, price);
  if(transaction_Res) {
  res.send({message: "Transaction created successfully"});
  } else {
    res.status(500).json({message: "Transaction failed"});
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
