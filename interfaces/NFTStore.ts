// import { BigNumber, Event } from "ethers";
import { BigNumberish } from "ethers";
export interface INftStoreContract extends IERC721, IEthersBaseContract {
    marketplaceOwner(): string;          
    currentTokenId(): number;            
    totalItemsSold(): number;            
    globalFeePercent(): number;          

    //F(x)
    getGlobalFeePercent: () => number;
    getCurrentTokenId: () => number;
    getNFTListing: (tokenId: string) => INftItem;
    getAllListedNFTS: () => INftItem[];
    getMyNFTs: () => INftItem[];

    createToken: (tokenURI: string, price: number) => number;
    updateGlobalFeePercent: (newFee: number) => void;
    executeSale: (tokenId: number) => void;

}
interface INftItem {
    tokenId: number;
    owner: string;
    seller: string;
    price: number;
}

///////////////////
interface IERC721 {
    // Eventos
    Transfer(from: string, to: string, tokenId: number): void;
    Approval(owner: string, approved: string, tokenId: number): void;

    // Funciones
    balanceOf(owner: string): Promise<number>;
    ownerOf(tokenId: number): Promise<string>;
    safeTransferFrom(from: string, to: string, tokenId: number): Promise<void>;
    transferFrom(from: string, to: string, tokenId: number): Promise<void>;
    approve(to: string, tokenId: number): Promise<void>;
    getApproved(tokenId: number): Promise<string>;
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
}

export interface IEthersBaseContract {
    address: string;                    // Dirección del contrato
    signer?: any;                       // Signer del contrato (opcional)
    provider: any;                      // Proveedor de Ethereum
    interface: any;
  
    // Métodos para conectar y cambiar el signer o proveedor del contrato
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