"use client"
import { WalletContext } from "@/context/Wallet"
import { BrowserProvider } from 'ethers'
import { useContext } from "react"

import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/public/logo.png"
// import { formatETH } from "@/utils/helpers"

import { formatEther } from "ethers"; // Ajusta la ruta según tu configuración
import { round2Decimals, shortenAddress } from "@/utils/helpers"


export const Header = () => {

    const {
        isConnected,
        userAddress,
        signer,
        userBalance,
        setIsConnected,
        setUserAddress,
        setUserBalance,
        setSigner,
    } = useContext(WalletContext)


    const connectWallet = async () => {
        if (!window.ethereum) {
            throw new Error("Metamask is not installed")
        }
        try {
            const provider = new BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            setSigner(signer)

            const newtork = await provider.getNetwork()
            const chainIsNotSepolia = newtork.chainId.toString() != "11155111"

            if (chainIsNotSepolia) alert("Swtich to sepolia")

            const accounts = await provider.send("eth_requestAccounts", [])

            const balance = await provider.getBalance(accounts[0]);
            setUserAddress(accounts[0])
            setUserBalance(formatEther(balance))
            setIsConnected(true)

        } catch (error) {
            console.log("conenction metamask err: ", error)
        }
    }


    const classes = {
        header: "py-5 shadow-md bg-[#003b46] px-8",
        container: "flex justify-between items-center mx-auto max-w-[1500px]",
        logo: "text-3xl font-bold text-[#00cffd]",
        nav: "flex items-center gap-5",
        navLinks: "gap-6 flex list-none m-0 p-0",
        navLinkItem: "justify-between mr-5 last:mr-0",
        link: "text-[#00cffd] font-bold text-2xl transition-all duration-300 hover:text-[#0091bf]",
        ctaBtn: "border-none text-lg font-semibold py-2 px-4 rounded",
        inactiveBtn: "bg-[#ff6f61] text-white cursor-pointer transition-all duration-300 hover:bg-[#e65c50]",
        activeBtn: "bg-green-500 text-white cursor-not-allowed opacity-80",
    };

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>
                    <Link href="/">
                        <Image src={Logo} width={280} height={44} alt="logo" />
                    </Link>
                </div>
                <nav className={classes.nav}>
                    <ul className={classes.navLinks}>
                        <li>
                            <Link href="/nft/market" className={classes.link}>
                                MarketPlace
                            </Link>
                        </li>
                        <li>
                            <Link href="/nft/createListing" className={classes.link}>
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className={classes.link}>
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <button
                        className={`${classes.ctaBtn} ${isConnected ? classes.activeBtn : classes.inactiveBtn}`}
                        onClick={connectWallet}
                    >
                        {isConnected
                            ? shortenAddress(userAddress)
                            : "Connect wallet"
                        }
                    </button>
                    {userBalance &&
                        <span className={`${classes.ctaBtn} ${classes.activeBtn}`}>
                            {round2Decimals(userBalance)} Eth
                        </span>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header