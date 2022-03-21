import fs from 'fs';
import { ethers } from 'ethers';
import { ThirdwebSDK } from "@3rdweb/sdk";

const fileDir = '/home/mannguyen/Pictures/robot/';

async function getImageName () {
  return fs.readdirSync(fileDir);
}

async function mint() {
    let img = await getImageName(); //return array image name.
  
    let nft_smart_contract_address = "0xD9bC403529471515F16DA32eee652c0a6cEcBA78";
    const rpcUrl = "https://polygon-rpc.com/";
    const provider = ethers.getDefaultProvider(rpcUrl);
    const sdk = new ThirdwebSDK(provider);

    const nft = sdk.getNFTModule(nft_smart_contract_address);

    await nft.mint({
      name: "Hi 👋",
      description: "If you are interested in...follow me✅",
      image: "ipfs://QmbGpe6dJQA9awBbTKEULufp9TTjXw1esVUbZNQrLM57nK",
      properties: {},
    });
    
  }
  
  // Running the entire thing
  mint();