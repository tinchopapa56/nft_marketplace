import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { getIpfsUrlFromPinata } from '@/utils/helpers';
import { INft } from '@/interfaces/INft';


interface IProps {
    nft: INft;
}

const NftCard: React.FC<IProps> = ({ nft }) => {
    console.log("vard", nft)
    const IPFSUrl = getIpfsUrlFromPinata(nft.image);

    const limitedDescription =
        nft.description.length > 100
            ? nft.description.substring(0, 100) + "..."
            : nft.description;

    const styles = {
        title: "relative overflow-hidden rounded-[8px]",
        imageContainer: "relative w-full h-full transition-transform duration-300 ease-in-out hover:scale-105",
        overlay: "absolute bottom-0 left-0 w-full bg-gradient-to-t from-[rgba(255,165,0,0.8)] to-[rgba(255,215,0,0.5)] p-5 box-border transition-opacity duration-500 ease-in-out transition-transform opacity-0 translate-y-full",
        tileHoverOverlay: "hover .overlay:opacity-100 hover .overlay:translate-y-0",
        text: "text-white",
        textStrong: "text-lg font-bold mb-2",
        textP: "text-base m-0 overflow-hidden text-ellipsis max-h-[3em] whitespace-nowrap",
    };



    return (
        <div className={styles.title}>
            <div className={styles.imageContainer}>
                <Image src={IPFSUrl} alt="" width={500} height={360} />
            </div>
            <div className={styles.overlay}>
                <Link href={`/nft/${nft.tokenId}`} className={styles.text}>
                    <strong>{nft.name}</strong>
                    <p>{limitedDescription}</p>
                </Link>
            </div>
        </div>
    )
}

export default NftCard

