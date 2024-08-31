import { useQuery } from "react-query";
import FetchingList from "../Services/Fetchcollection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../Store/Contextapi";
import FetchingSearchData from "../Services/FetchingSearchCollection";
import FetchDownload from "../Services/FetchDownloadPhoto";

function Collection() {
  const Navigator = useNavigate();
  const [Page, setPage] = useState(1);
  const { Query } = useContext(MyContext);

  const queryKey = Query === null ? ["List", Page] : ["Search", Query, Page];
  const queryFn =
    Query === null
      ? () => FetchingList(Page)
      : () => FetchingSearchData(Query, Page);

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn,
    cacheTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 20,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  function GoingTogetSingleimg(item) {
    let id = Query !== null ? item.cover_photo?.id : item.id;
    if (id) {
      Navigator(`/photo/${id}`);
    } else {
      console.error("ID not found for item", item);
    }
  }

  async function downloadfn(item) {
    let id = Query !== null ? item.cover_photo?.id : item.id;

    if (!id) {
      console.error("ID not found for the item");
      return;
    }

    try {
      const response = await FetchDownload(id);
      const urlofdown = response.data.url;

      // Fetch the image as a Blob
      const imageResponse = await fetch(urlofdown);
      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${id}.jpg`; // Filename for the downloaded image
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link); // Clean up
      URL.revokeObjectURL(imageUrl); // Revoke the object URL after download
    } catch (error) {
      console.error("Error during download:", error);
    }
  }

  return (
    <div className="w-full mt-[60px] p-4 lg:p-8 flex flex-col items-center justify-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.isArray(data) &&
          data.map((item) => {
            const id = item.id || item.cover_photo?.id;

            return (
              <div
                key={id}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 relative "
              >
                <img
                  src={
                    item.urls?.regular ||
                    item.cover_photo?.urls?.regular ||
                    "fallback-image-url.jpg"
                  }
                  className="w-full h-full object-cover"
                  alt={item.alt_description || "Image"}
                  onClick={() => GoingTogetSingleimg(item)}
                />
                <div className="absolute bottom-2 left-1 flex items-center">
                  <button
                    onClick={() => downloadfn(item)}
                    className="relative text-black bg-white px-2 py-1 rounded-full  group"
                  >
                    <i className="fa-regular fa-circle-down text-black"></i>
                    <span className="absolute bottom-full mb-2 left-8 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Download Image
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="w-full flex justify-center items-center mt-8">
        <div className="flex gap-4">
          <button
            className="w-[120px] font-bold bg-green-300 h-[40px] text-black rounded-lg hover:bg-green-400 transition-colors duration-300"
            onClick={() => Page > 1 && setPage(Page - 1)}
          >
            Prev
          </button>
          <button
            className="w-[120px] font-bold bg-red-400 h-[40px] text-black rounded-lg hover:bg-red-500 transition-colors duration-300"
            onClick={() => setPage(Page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;
