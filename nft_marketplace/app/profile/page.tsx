"use client";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Marketplace from "@/marketplace.json";
import { WalletContext } from "@/context/Wallet";
import NftCard from "../components/nftCard/NftCard";

export const Profile = () => {

    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState("0");
    const { isConnected, userAddress, signer } = useContext(WalletContext);

    async function getNFTitems() {
        let sumPrice = 0;
        const itemsArray = [];
        if (!signer) return;
        const contract = new ethers.Contract(
            Marketplace.address,
            Marketplace.abi,
            signer
        );

        const transaction = await contract.getMyNFTs();

        for (const i of transaction) {
            const tokenId = parseInt(i.tokenId);
            const tokenURI = await contract.tokenURI(tokenId);
            const meta = (await axios.get(tokenURI)).data;
            const price = ethers.formatEther(i.price);

            const item = {
                price,
                tokenId,
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            };

            itemsArray.push(item);
            sumPrice += Number(price);
        }
        return { itemsArray, sumPrice };
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { itemsArray, sumPrice } = await getNFTitems();
                setItems(itemsArray);
                setTotalPrice(sumPrice);
            } catch (error) {
                console.error("Error fetching NFT items:", error);
            }
        };

        fetchData();
    }, [isConnected]);

    const styles = {
        container: "flex flex-col h-screen bg-gradient-to-r from-[#00cffd] to-[#b57edc]",
        
        innerContainer: "flex flex-col items-center justify-center flex-grow",
      
        content: "max-w-[1500px] mx-auto mb-[90px] max-h-[700px] overflow-y-scroll px-2.5",
      
        userInfo: "my-5 flex flex-col items-center justify-center",
        
        userInfoLabel: "text-[26px] font-bold mb-2.5 text-gray-200",
      
        address: "text-[22px] font-bold",
      
        stats: "flex items-center justify-between",
      
        statLabel: "text-[24px] font-bold mr-2.5 text-gray-200",
      
        value: "text-[24px] font-bold",
      
        heading: "text-[38px] text-center text-white my-4",
      
        nftSection: "mt-5",
      
        nftGrid: "grid grid-cols-3 gap-5",
      
        noNFT: "text-[28px] font-bold text-red-500 text-center my-4",
      
        notConnected: "text-[40px] font-bold text-red-500 text-center my-4",
      };
      

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.content}>
                    {isConnected ? (
                        <>
                            <div className={styles.userInfo}>
                                <span className={styles.label}>Wallet Address:</span>
                                <span className={styles.address}>{userAddress}</span>
                            </div>
                            <div className={styles.stats}>
                                <div className={styles.stats}>
                                    <span className={styles.statLabel}>Number of NFTs:</span>
                                    <span className={styles.value}>{items?.length}</span>
                                </div>
                                <div className={styles.stats}>
                                    <span className={styles.statLabel}>Total Value:</span>
                                    <span className={styles.value}>{totalPrice} ETH</span>
                                </div>
                            </div>
                            <div className={styles.nftSection}>
                                <h2 className={styles.heading}>Your NFTs</h2>
                                {items?.length > 0 ? (
                                    <div className={styles.nftGrid}>
                                        {items?.map((nft, i) => (
                                            <NftCard nft={nft} key={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.noNFT}>You do not have any NFT...</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.notConnected}>You are not connected...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile