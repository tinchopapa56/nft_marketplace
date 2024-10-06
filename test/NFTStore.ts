import { INftStoreContract } from "../interfaces/NFTStore";

const { expect } = require("chai");
const { ethers } = require("hardhat");

let NFTSTORE: INftStoreContract; 
// let NFTSTORE: any; //should get ethers BasaeContrtact Interface
let owner: string, addr1: string, addr2: string;

beforeEach(async function () {
    NFTSTORE = await ethers.deployContract("NFTStore");
    // console.log("viendo", NFTSTORE);

    [owner, addr1, addr2] = await ethers.getSigners();
});

describe("Deployment", function () {
    it("Should set the right owner", async () => {
        const marketplaceOwner = await NFTSTORE.marketplaceOwner();
        expect(marketplaceOwner).to.equal(owner);
    });

    it("Should set the listing fee percentage", async function () {
        const listingFeePercentage = await NFTSTORE.getGlobalFeePercent();
        expect(listingFeePercentage).to.equal(20);
    });
});


describe("Creating NFTs", function () {
    it("Should create a new token and listing", async function () {
        const tokenURI = "https://example.com/nft";
        const price = ethers.parseEther("1");

        await NFTSTORE.createToken(tokenURI, price);

        const listing = await NFTSTORE.getNFTListing(1);
        expect(listing.tokenId).to.equal(1);
        expect(listing.owner).to.equal(owner);
        expect(listing.price).to.equal(price);
    });
});

describe("Updating Listing Fee", function () {
    it("Should update the listing fee percentage", async function () {
        await NFTSTORE.updateGlobalFeePercent(10);
        expect(await NFTSTORE.getGlobalFeePercent()).to.equal(10);
    });

    it("Should only allow owner to update the listing fee percentage", async function () {
        await expect(
            NFTSTORE.connect(addr1).updateGlobalFeePercent(10)
        ).to.be.revertedWith("Only owner can do this");
    });
});

describe("Executing Sales", function () {
    beforeEach(async function () {
        const tokenURI = "https://example.com/nft";
        const price = ethers.parseEther("1");
        await NFTSTORE.createToken(tokenURI, price);
    });

    it("Should execute a sale", async function () {
        const price = ethers.parseEther("1");
        await NFTSTORE.connect(addr1).executeSale(1, { value: price });

        const listing = await NFTSTORE.getNFTListing(1);
        expect(listing.seller).to.equal(addr1);
        expect(listing.owner).to.equal(owner);
    });

    it("Should revert if the payment is incorrect", async function () {
        const incorrectPrice = ethers.parseEther("0.5");
        await expect(
            NFTSTORE.connect(addr1).executeSale(1, { value: incorrectPrice })
        ).to.be.revertedWith(
            "You must match the listing price"
        );
    });
});

describe("Retrieving NFTs", function () {
    beforeEach(async function () {
        const tokenURI1 = "https://example.com/nft1";
        const tokenURI2 = "https://example.com/nft2";
        const price = ethers.parseEther("1");

        await NFTSTORE.createToken(tokenURI1, price);
        await NFTSTORE.createToken(tokenURI2, price);
    });

    it("Should retrieve all listed NFTs", async function () {
        const allNFTs = await NFTSTORE.getAllListedNFTS();
        expect(allNFTs.length).to.equal(2);
    });

    it("Should retrieve my NFTs", async function () {
        const myNFTs = await NFTSTORE.getMyNFTs();
        expect(myNFTs.length).to.equal(2);
    });
});
