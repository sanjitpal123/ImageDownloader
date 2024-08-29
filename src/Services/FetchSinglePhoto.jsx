import axios from "axios";
import AxiosInstance from "../Helper/Axiosinstance";
 async function FetchSinglePhoto(id)
{
  try{
    const response = await AxiosInstance.get(`/photos/${id}`);
    console.log("single photo",response);
       return response;
   
  }
  catch(error)
  {
    throw error
  }
}
export default FetchSinglePhoto
