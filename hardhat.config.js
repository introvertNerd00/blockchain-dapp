const { network } = require("hardhat");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

SEPOLIA_URL= process.env.SEPOLIA_URL;
PRIVATE_KEY= process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      networkId:"11155111",
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

//contract_add= 0x6739B521d06adBC08e5C7346E13a50bD94eE5C7c