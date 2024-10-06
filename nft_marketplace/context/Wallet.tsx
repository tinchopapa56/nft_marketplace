"use client";

import React, { createContext, useState, ReactNode } from "react";

interface IWalletContextType {
    isConnected: boolean;
    userAddress: string | null;
    signer: unknown;
    setIsConnected: (isConnected: boolean) => void;
    setUserAddress: (userAddress: string | null) => void;
    setSigner: (signer: unknown) => void;
}

export const WalletContext = createContext<IWalletContextType>({
    isConnected: false,
    userAddress: null,
    signer: null,
    setIsConnected: () => { },
    setUserAddress: () => { },
    setSigner: () => { },
});
export const WalletContextProvider = ({ children } : { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [signer, setSigner] = useState<unknown>(null); 

    return (
        <WalletContext.Provider
            value={{
                isConnected,
                userAddress,
                signer,
                setIsConnected,
                setUserAddress,
                setSigner,
            }}
        >
            {children}
        </WalletContext.Provider>
    )
};
