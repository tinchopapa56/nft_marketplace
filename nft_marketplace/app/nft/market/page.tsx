"use client";
import { WalletContext } from "@/context/Wallet"
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import marketplace from "@/marketplace.json";
// import styles from "./marketplace.module.css";
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import NFTCard from "../components/nftCard/NFTCard";
import axios from "axios";
import NftCard from "@/app/components/nftCard/NftCard";
import { INft } from "@/interfaces/INft";
import { IPinataMetadata } from "@/interfaces/IPinataMetadata";

const styles = {
    container: "flex flex-col h-screen bg-gradient-to-r from-[#00cffd] to-[#b57edc]",
    innerContainer: "flex flex-col flex-grow items-center justify-center",
    content: "max-w-[1500px] mx-auto mb-[90px] max-h-[700px] overflow-y-scroll px-[10px]",
    heading: "text-[42px] text-center text-white mb-[28px] uppercase",
    nftSection: "mt-[20px]",
    nftGrid: "grid grid-cols-3 gap-[20px]",
    noNFT: "text-[32px] font-bold text-[#ccc] text-center my-[16px]",
    notConnected: "text-[40px] font-bold text-red-500 text-center my-[16px]",
  };
  

export default function Marketplace() {
  const [items, setItems] = useState<INft[]>([]);
  const { isConnected, signer } = useContext(WalletContext);

  async function getNFTitems() {
    const itemsArray : INft[] = [];
    if (!signer) return;
    const contract = new ethers.Contract(
      marketplace.address,
      marketplace.abi,
      signer
    );
    console.log(signer)
    const tx = await contract.getAllListedNFTS();

    for (const i of tx) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: meta }: { data: IPinataMetadata } = await axios.get(tokenURI);
      const price = ethers.formatEther(i.price);

      const item : INft = {
        price,
        tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };

      itemsArray.push(item);
    }
    return itemsArray;
  }

  useEffect(() => {
    const fetchAllNfts = async () => {
      try {
        const allNfts = await getNFTitems();
        if(allNfts){
            setItems(allNfts);
        }
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    fetchAllNfts();
  }, [isConnected]);

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          {isConnected ? (
            <>
              <div className={styles.nftSection}>
                <h2 className={styles.heading}>NFT Marketplace</h2>
                {items?.length > 0 ? (
                  <div className={styles.nftGrid}>
                    {items?.map((nft, i) => (
                      <NftCard nft={nft} key={i} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNFT}>No NFT Listed Now...</div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.notConnected}>You are not connected...</div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}