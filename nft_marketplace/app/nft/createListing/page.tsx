"use client"
import React, { useContext, useState } from 'react';
import { Input } from '@/app/components/common';
// import { useRouter } from 'next/router';
import { WalletContext } from '@/context/Wallet';
import { uploadFileToIPFS, uploadJsonToIPFS } from '@/API/pinata';
import { ethers } from 'ethers';
import NFftMarketplaceContract from "@/marketplace.json"


const CreateListingNFT = () => {
    const clases = {
        container: "p-16 flex justify-center items-center bg-gradient-to-r from-[#00cffd] to-[#b57edc]",
        card: "w-[450px] flex justify-center items-center flex-col bg-white p-6 rounded-lg shadow-lg",
        title: "text-center text-2xl mb-5",
        input: "mt-4 w-full",
        button: "mt-8 px-6 py-2 bg-[#00cffd] text-white rounded hover:bg-[#00b0e3] transition-all",
    };

    const [formParams, setFormParams] = useState({
        name: "",
        description: "",
        price: "",
    });
    const [fileURL, setFileURL] = useState();
    const [message, setMessage] = useState("");
    const [btn, setBtn] = useState(false);
    const [btnContent, setBtnContent] = useState("List NFT");
    // const router = useRouter();

    const { isConnected, signer } = useContext(WalletContext);

    async function onFileChange(e) {
        try {
            const file = e.target.files[0];
            const data = new FormData();
            data.set("file", file);
            setBtn(false);
            setMessage("Uploading image... Please don't click anything!");
            
            const response = await uploadFileToIPFS(data);
            if (response.success === true) {
                setBtn(true);
                setMessage("");
                setFileURL(response.urlInPinata);
            }
        } catch (e) {
            console.log("Error during file upload...", e);
        }
    }

    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            setMessage("Please fill all the fields!");
            return -1;
        }

        const nftJSON = {
            name,
            description,
            price,
            image: fileURL,
        };

        try {
            const response = await uploadJsonToIPFS(nftJSON);
            if (response.success === true) {
                return response.urlInPinata;
            }
        } catch (e) {
            console.log("Error uploading JSON metadata: ", e);
        }
    }

    async function listNFT(e) {
        try {
            setBtnContent("Processing...");

            const metadataURL = await uploadMetadataToIPFS();

            if (metadataURL === -1) return;

            setMessage("Uploading NFT...Please dont click anythying!");

            const contract = new ethers.Contract(
                NFftMarketplaceContract.address,
                NFftMarketplaceContract.abi,
                signer
            );
            const price = ethers.parseEther(formParams.price);
            console.log("viendo5", metadataURL)
            console.log("viendo5b", formParams)
            console.log("viendo5c", price)
            console.log("viendo5d", contract)

            const transaction = await contract.createToken(metadataURL, price);
            console.log("viendo6")
            
            await transaction.wait();
            console.log("viendo7")


            setBtnContent("List NFT");
            setBtn(false);
            setMessage("");
            setFormParams({ name: "", description: "", price: "" });
            alert("Successfully listed your NFT!");
            // router.push("/");
        } catch (err) {
            alert("Upload error", err);
        }
    }

    return (
        <div className={clases.container}>
            <div className={clases.card}>
                <h1 className={clases.title}>
                    UPLOAD YOUR NFT
                </h1>

                <Input
                    onChange={(e) => setFormParams({
                        ...formParams,
                        name: e.target.value
                    })}
                    type="text"
                    labelText="NFT Name"
                />
                <Input
                    onChange={(e) => setFormParams({
                        ...formParams,
                        description: e.target.value
                    })}
                    type="textArea"
                    labelText="NFT Description"
                />
                <Input
                    onChange={(e) => setFormParams({
                        ...formParams,
                        price: e.target.value
                    })}
                    type="number"
                    labelText="Price (in ETH)"
                />
                <Input
                    onChange={onFileChange}
                    type="file"
                    labelText="Upload Image"
                />

                <div className={"text-center text-red-300"}>{message}</div>
                <button
                    onClick={listNFT}
                    type="submit"
                    className={clases.button}
                >
                    {btnContent === "Processing..." && (
                        <span>Loading pa</span>
                    )}
                    {btnContent}
                </button>
            </div>
        </div>
    );
}

export default CreateListingNFT;
