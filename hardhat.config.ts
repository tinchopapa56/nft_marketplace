import { HardhatUserConfig } from "hardhat/config";
// require("dotenv").config();
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
    }
  }
};

export default config;

/*

import { createPublicClient, http, Block } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(""),
});

const block: Block = await client.getBlock({
  blockNumber: 123456n,
});

console.log(block);

*/