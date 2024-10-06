export interface INftStoreContract extends IERC721 {
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
