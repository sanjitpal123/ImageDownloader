import AxiosInstance from "../Helper/Axiosinstance";
 async function FetchTotalPhoto(username)
{
    try{
          const response=await AxiosInstance.get(`/users/${username}/photos`,{
            params:{
                page:1,
                per_page:34,
            }
          })
          console.log("total photo",response);
          return response;
    }catch(error)
    {
        throw error;
    }
 
}
export default FetchTotalPhoto;