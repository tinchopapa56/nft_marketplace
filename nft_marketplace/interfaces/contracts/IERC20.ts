import { BigNumberish } from "ethers";

export interface IERC20 {
    name(): Promise<string>; 
    symbol(): Promise<string>; 
    decimals(): Promise<number>; 
    totalSupply(): Promise<BigNumberish>; 
    balanceOf(owner: string): Promise<BigNumberish>; 
    transfer(to: string, amount: BigNumberish): Promise<boolean>; 
    approve(spender: string, amount: BigNumberish): Promise<boolean>; 
    transferFrom(from: string, to: string, amount: BigNumberish): Promise<boolean>; 

    // Events
    Transfer: (to: string, amount: BigNumberish) => void; 
    Approval: (owner: string, spender: string, amount: BigNumberish) => void; 
}
