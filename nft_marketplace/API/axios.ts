import axios from 'axios';

const axiosMiddleware = async (config: Axios.AxiosXHRConfig<unknown>) => {
    try {
        const res = await axios(config);
        return {
            success: true,
            data: res.data,
            urlInPinata: "https://gateway.pinata.cloud/ipfs/" + res?.data?.IpfsHash
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            success: false,
            message: err?.res ? err?.res.data.message : 'An error occurred',
            error: err,
        };
    }
};

export default axiosMiddleware;
