import AxiosInstance from "../Helper/Axiosinstance";
async function FetchCollection(username)
{
    console.log("userinnn",username)
try{
    const response=await AxiosInstance.get(`/users/${username}/collections`,{
        params:{
            page:1,
            per_page:20
        }
    })
    console.log("collection",response)
    return response

}catch(error)
{
    throw error
}
}
export default FetchCollection