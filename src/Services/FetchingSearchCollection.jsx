import AxiosInstance from "../Helper/Axiosinstance";

async function FetchingSearchData(query, page) {
  try {
    const response = await AxiosInstance.get("/search/collections", {
      params: {
        page: page,
        per_page:34,
        query:query
      }
    });
    return response.data.results; 
  } catch (error) {
    throw error;
  }
}

export default FetchingSearchData;
