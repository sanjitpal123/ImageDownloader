
import axios from "axios";
import AxiosInstance from "../Helper/axiosinstance";
async function FetchingList(Page) {
    try {
        const response = await AxiosInstance.get('/photos', {
            params: {
                page:Page ,
                per_page: 40
            }
        });
        console.log("List of images:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error request:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        throw error;
    }
}

export default FetchingList;