import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from 'ethers';
import fs from "fs";
import fse from 'fs-extra';
import 'dotenv/config' //


const filePath = process.env.IMG_PATH // path to images
const pathToMint = process.env.IMG_PATH_TO_MINT

const toAddress = process.env.OWNER_WALLET_ADDRESS; // owner wallet.
const walletKey = process.env.PRIVATE_WALLET_KEY;

const elchamyKey =  process.env.ALCHEMY_KEY;
const nftModule =  process.env.NFT_MODULE; // Nft module 



// Begin: common function
async function copyImageTo(currentPath, newPath) {
    fse.copySync(currentPath, newPath);
    return ;
}

async function getImageList(path) {
    return fs.readdirSync(path);
}

async function handleRename(path) {
    
    let arrayImage = await getImageList(path);

    for (let idx in arrayImage) {
        let currentName = arrayImage[idx];
        let newName = '';
        let itemImg = currentName.substring(0, currentName.indexOf('.'));

        if (itemImg.length == 1) {
            newName = '#0000'.concat(itemImg + '.png');
            fs.renameSync(path.concat(currentName), path.concat(newName));
            continue;
        }

        if (itemImg.length == 2) {
            newName = '#000'.concat(itemImg + '.png');
            fs.renameSync(path.concat(currentName), path.concat(newName));
            continue;
        }

        if (itemImg.length == 3) {
            newName = '#00'.concat(itemImg + '.png');
            fs.renameSync(path.concat(currentName), path.concat(newName));
            continue;
        }

        if (itemImg.length == 4) {
            newName = '#0'.concat(itemImg + '.png');
            fs.renameSync(path.concat(currentName), path.concat(newName));
            continue;
        }

        if (itemImg.length >= 5) {
            newName = '#'.concat(itemImg + '.png');
            fs.renameSync(path.concat(currentName), path.concat(newName));
            continue;
        }
    }
}

// End: common function

async function mint() {

    // Instantiate 3rdweb SDK
    const sdk = new ThirdwebSDK(
        new ethers.Wallet(
            // Your wallet private key
            walletKey,
            // This is the RPC URL for Rinkeby
            ethers.getDefaultProvider(elchamyKey),
        ),
    );

    const module = sdk.getNFTModule(nftModule);

    await copyImageTo(filePath, pathToMint);
    await handleRename(pathToMint)
    
    let newArrImg = await getImageList(pathToMint);
    let metadatas = [];
    newArrImg.forEach((img) => {
        let imgItem = {}
        imgItem.name = img.substring(0, img.indexOf('.'));
        imgItem.description = img;
        imgItem.image =  fs.readFileSync(pathToMint.concat(img));
        metadatas.push(imgItem);
    })

    console.log('Mint...');
    console.time();
    let rs = await module.mintBatchTo(toAddress, metadatas);
    console.timeEnd();
    console.log('Done');
}

mint();

