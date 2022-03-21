import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from 'ethers';
import 'dotenv/config' //


const marketPlace = process.env.MARKET_MODULE; // '0x6c003772f5438406F35732aA81c03F2e562826F9';
const nftModule = process.env.NFT_MODULE; // '0xf3602758D4dD22f42Be352c558b5e3ce647c40f9';
const alchemyKey =  process.env.ALCHEMY_KEY; 
const walletKey = process.env.PRIVATE_WALLET_KEY;


async function listToMarket() {

    const sdk = new ThirdwebSDK(
        new ethers.Wallet(
            // Your wallet private key
            walletKey,
            // This is the RPC URL for Rinkeby
            ethers.getDefaultProvider(alchemyKey),
        ),
    );
    const module = sdk.getMarketplaceModule(marketPlace);

    const tokenIdOffer = "1";

    // console.log(ethers.utils.parseUnits(tokenIdOffer, 18).toB());
    // Data of the listing you want to create
    const listing = {
        // NFT module address
        assetContractAddress: nftModule,
        // token ID of the asset you want to list
        tokenId: tokenIdOffer,
        // in how many seconds with the listing open up
        startTimeInSeconds: 0,
        // how long the listing will be open for
        listingDurationInSeconds: 86400,
        // how many of the asset you want to list
        quantity: 1,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: "0x0000000000000000000000000000000000000000",
        // how much the asset will be sold for
        buyoutPricePerToken: 10 , // Can not assign for number less than Zero
    }

    await module.createDirectListing(listing);

}


listToMarket();

