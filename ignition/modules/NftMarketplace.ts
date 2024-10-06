// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const DeployModule = buildModule("NFTstore_Contract", (m) : any => {
  const marketplace = m.contract("NFTStore");
  return marketplace
})

// npx hardhat ignition deploy 
//  ./ignition/modules/NftMarketplace.ts 
//  --network sepolia


export default DeployModule;
