import { INft } from "../INft";
import { IERC721 } from "./IERC721";
import { IEthersBaseContract } from "../ethers/ethers";

export interface INftStoreContract extends IERC721, IEthersBaseContract {
  marketplaceOwner(): string;
  currentTokenId(): number;
  totalItemsSold(): number;
  globalFeePercent(): number;

  //F(x)
  getGlobalFeePercent: () => number;
  getCurrentTokenId: () => number;
  getNFTListing: (tokenId: string) => INft;
  getAllListedNFTS: () => INft[];
  getMyNFTs: () => INft[];

  createToken: (tokenURI: string, price: number) => number;
  updateGlobalFeePercent: (newFee: number) => void;
  executeSale: (tokenId: number) => void;

}