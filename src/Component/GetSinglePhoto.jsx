import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FetchSinglePhoto from "../Services/FetchSinglePhoto";
import { useNavigate } from "react-router-dom";

function GetSinglePhoto() {
  const Navigator = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single", id],
    queryFn: () => FetchSinglePhoto(id),
    cacheTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 20,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  function GoingTogetSingleimg(id) {
    Navigator(`/photo/${id}`);
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex lg:w-[82%] w-full md:w-[90%] flex-wrap mt-[65px]">
          <div className="lg:w-[48%] w-full mx-1 lg:mx-2 lg:my-4 h-[50vh]">
            {" "}
            <img
              src={data?.data?.urls?.regular}
              alt={data?.data?.alt_description || "Image"}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="info w-full lg:w-[45%] lg:mx-2 lg:my-4 ">
            <div className="w-full   text-1xl flex  rounded-[20px] items-center gap-2 font-bold">
            
              <img src={data.data.user.profile_image.medium} className="w-[60px] h-[60px] rounded-full"/>
             
              <div className="text-white mt-5">
                <span>{data.data.user.first_name}  {data.data.user.last_name}</span>
                <div className="text-[14px] font-semibold">{data.data.user.bio}</div>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap item justify-center">
        {Array.isArray(data?.data?.related_collections?.results) &&
          data.data.related_collections.results.map((result) =>
            result.preview_photos.map((photo) => (
              <div
                key={photo.id}
                className="w-full sm:w-[48%] md:w-[45%] lg:w-[31%] xl:w-[23%] 2xl:w-[20%] mx-1 my-2"
                onClick={() => GoingTogetSingleimg(photo.id)}
              >
                <img
                  src={photo.urls.regular}
                  className="w-full h-full object-cover"
                  alt={photo.alt_description || "Image"}
                />
              </div>
            ))
          )}
      </div>
    </>
  );
}

export default GetSinglePhoto;
