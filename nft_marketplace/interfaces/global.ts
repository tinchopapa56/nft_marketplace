declare global {
    interface IEthereum {
        isMetaMask?: boolean;
        request: (args: { method: string; params?: unknown[] }) => Promise<any>;
        on?: (event: string, callback: (...args: unknown[]) => void) => void;
        removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
    }

    interface Window {
        ethereum: IEthereum;
    }
}
export {};
