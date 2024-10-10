export interface IERC721 {
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