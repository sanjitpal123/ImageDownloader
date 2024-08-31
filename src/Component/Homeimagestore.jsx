import { useQuery } from 'react-query';
import FetchingList from '../Services/Fetchcollection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Store/Contextapi';
import FetchingSearchData from '../Services/FetchingSearchCollection';

function Collection() {
  const Navigator = useNavigate();
  const [Page, setPage] = useState(1);
  const { Query } = useContext(MyContext);

  // Query key and function based on Query value
  const queryKey = Query === null ? ['List', Page] : ['Search', Query, Page];
  const queryFn = Query === null
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

  function GoingTogetSingleimg(id) {
    Navigator(`/photo/${id}`);
  }

  function downloadImage(url, filename) {
    fetch(url, {
      method: 'GET',
      headers: {}
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(err => console.error('Error while downloading image:', err));
  }

  return (
    <div className="w-full mt-[60px] p-4 lg:p-8 flex flex-col items-center justify-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.isArray(data) &&
          data.map((item) => (
            <div
              key={item.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.urls?.regular || item.cover_photo?.urls?.regular} // Use fallback if needed
                className="w-full h-full object-cover"
                alt={item.alt_description || 'Image'}
                onClick={() => GoingTogetSingleimg(item.id)} // Pass item.id here
              />
              <button
                onClick={() => downloadImage(item.urls?.full || item.cover_photo?.urls?.full, `image-${item.id}.jpg`)}
                className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
              >
                Download
              </button>
            </div>
          ))}
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
