import axiosMiddleware from "./axios";

// check if env workds
const JWT = process.env.PINATA_API_JWT


const pinataBaseUrl = "https://api.pinata.cloud/pinning"

interface IPinataRes {
    IpfsHash: string;   // Hash de IPFS
    PinSize: number;    // Tamaño del pin en bytes
    Timestamp: string;  // Marca de tiempo de cuando se realizó el pin
    isDuplicate: boolean;
}




export const uploadJsonToIPFS = async (JSONBody) => {
    const urlJson2Ipfs = `${pinataBaseUrl}/pinJSONToIPFS`;
    const header = {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
    };
    console.log("viendo1")

    const res = await axiosMiddleware({
        method: "POST",
        url: urlJson2Ipfs,
        data: JSONBody,
        headers: header,
    })
    console.log("viendo2")

    // urlInPinata: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash

    return res

}

export const uploadFileToIPFS = async (data) => {
    const pinataMetadata = JSON.stringify({
        name: data.get("file").name,
    })
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    data.append("pinataMetadata", pinataMetadata);
    data.append("pinataOptions", pinataOptions)


    const urlFileToIpfs = `${pinataBaseUrl}/pinFileToIPFS`
    const header = {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${JWT}`
    }
    console.log("viendo j", JWT)
    const res = await axiosMiddleware({
        method: "POST",
        url: urlFileToIpfs,
        data,
        headers: header,
    })
    // urlInPinata: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
    return res
}