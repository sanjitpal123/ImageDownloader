
import axios from "axios";
import { AccessKey } from "./AccessKey";

console.log("Access Key:", AccessKey);

const AxiosInstance = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: `Client-ID ${AccessKey}`
    }
});

AxiosInstance.interceptors.request.use(request => {
    console.log("Request Headers:", request.headers);
    return request;
});

export default AxiosInstance;
