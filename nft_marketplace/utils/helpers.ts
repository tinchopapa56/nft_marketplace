export const getIpfsUrlFromPinata = (pinataUrl: string): string => {
    const ipfsIndex = pinataUrl.indexOf("ipfs/") // length == 5
    const lastI = ipfsIndex + 5 - 1;
    const imgUrl = pinataUrl.substring(lastI); 

    const ipfsUrl = `https://ipfs.io/ipfs/${imgUrl}`; 
    return ipfsUrl
}
export const shortenAddress = (address: string) => {
    if (!address) return '';
    const formatted = address.substring(0, 6) + "..."
    return formatted
};
export const round2Decimals = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toFixed(2);
};
