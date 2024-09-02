import AxiosInstance from "../Helper/Axiosinstance";
async function FetchLikedPhoto(username)
{
  try{
    const response=await AxiosInstance.get(`/users/${username}/likes`,{
        params:{
            page:1,
            per_page:34
        }
    })
    console.log("total liked",response);
    return response;

  }catch(error)
  {
    throw new error;
  }

}
export default FetchLikedPhoto;