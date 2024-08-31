import AxiosInstance from "../Helper/Axiosinstance";

async  function FetchDownload (id)
{
  try{
    const response=await AxiosInstance.get(`/photos/${id}/download`)
     console.log("datainm",response);
    return response
  }
  catch(error)
  {
    throw error;
  }

}
export default FetchDownload;