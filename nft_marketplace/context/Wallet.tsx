"use client";

import React, { createContext, useState, ReactNode } from "react";

interface IWalletContextType {
    isConnected: boolean;
    userAddress: string | null;
    userBalance: bigint | number | string | null;
    signer: unknown;
    setIsConnected: (isConnected: boolean) => void;
    setUserAddress: (userAddress: string | null) => void;
    setUserBalance: (userBalance: bigint | string | number | null) => void;
    setSigner: (signer: unknown) => void;
}

export const WalletContext = createContext<IWalletContextType>({
    isConnected: false,
    userAddress: null,
    userBalance: 0,
    signer: null,
    setIsConnected: () => { },
    setUserAddress: () => { },
    setUserBalance: () => { },
    setSigner: () => { },
});
export const WalletContextProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<bigint | string | number | null>(null);
    const [signer, setSigner] = useState<unknown>(null);

    return (
        <WalletContext.Provider
            value={{
                isConnected,
                userAddress,
                userBalance,
                signer,
                setIsConnected,
                setUserAddress,
                setUserBalance,
                setSigner,
            }}
        >
            {children}
        </WalletContext.Provider>
    )
};
