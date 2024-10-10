import { BigNumberish } from "ethers";

export interface IEthersBaseContract {
    address: string;                    
    signer?: any;                       
    provider: any;                      
    interface: any;

    connect(signerOrProvider: any): IEthersBaseContract;
    attach(addressOrName: string): IEthersBaseContract;
    deployed(): Promise<IEthersBaseContract>;
    on(event: string, listener: (...args: any[]) => void): this;
    once(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener: (...args: any[]) => void): this;
    removeAllListeners(event: string): this;

    functions: {
        [name: string]: (...args: any[]) => Promise<any>;
    };

    callStatic: {
        [name: string]: (...args: any[]) => Promise<any>;
    };

    estimateGas: {
        //   [name: string]: (...args: any[]) => Promise<BigNumber>;
        [name: string]: (...args: any[]) => Promise<BigNumberish>;
    };

    filters: {
        [name: string]: (...args: any[]) => Event;
    };
}
export interface IJsonRpcSigner {
    provider: IEthersProvider;
    address: string;
}
export interface IEthersProvider {
    browserProvider: boolean;
    destroyed: boolean;
    disableCcipRead: boolean;
    lastBlockNumber: number;
    network: IEthersNetwork;
    pollingInterval: number;
    request: (method: string, params?: unknown[]) => Promise<unknown>;
}
export interface IEthersNetwork {
    name: string;
    chainId: number;
}
