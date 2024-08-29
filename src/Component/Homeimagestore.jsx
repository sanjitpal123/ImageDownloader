import { useQuery } from "react-query";
import FetchingList from "../Services/Fetchcollection";
import { useState } from "react";

function Collection() {
    const [Page , setPage]=useState(1)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["List", Page],
    queryFn: () => FetchingList(Page),
    cacheTime: 1000*60*20,
    staleTime:1000*60*20
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full mt-[60px] flex flex-col items-center justify-center">
    <div className="w-full flex flex-wrap justify-center">
      {Array.isArray(data) &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[48%] md:w-[45%] lg:w-[31%] xl:w-[23%] 2xl:w-[20%] mx-1 my-2"
          >
            <img
              src={item.urls.regular}
              className="w-full h-full object-cover"
              alt={item.alt_description || 'Image'}
            />
          </div>
        ))}
    </div>
  
  
  
      <div className="  w-full flex justify-center items-center">
        <div className="gap-4 flex   my-4">
          {" "}
          <button className="w-[120px] font-bold bg-green-300 h-[40px] text-black rounded-[10px]" onClick={()=> Page>0&& setPage(Page-1)}>
            Prev
          </button>
          <button className="w-[120px] bg-red-400 font-bold h-[40px] text-black rounded-[10px]"  onClick={()=>setPage(Page+1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;
