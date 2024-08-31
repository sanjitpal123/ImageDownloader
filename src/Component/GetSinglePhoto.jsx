import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FetchSinglePhoto from "../Services/FetchSinglePhoto";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function GetSinglePhoto() {
  const [Language, SetLanguage] = useState("en");
  const Navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("Selected Language:", Language);
  }, [Language]);

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

  let slugresult = [];
  let slugkey = [];
  for (let i in data.data.alternative_slugs) {
    slugresult.push(data.data.alternative_slugs[i]);
    slugkey.push(i);
  }
  let text = "";
  for (let i in data.data.alternative_slugs) {
    if (Language === i) {
      text += data.data.alternative_slugs[i];
    }
  }
  let Splitedtext = text.split("-");

  console.log(Splitedtext);
  let ExtractedText =[]
  for (let i = 0; i < Splitedtext.length - 1; i++) {
    ExtractedText.push(Splitedtext[i]);
  }

  return (
    <div className="flex flex-col items-center  justify-center p-4 mt-[50px] lg:p-8">
      <div className="flex flex-col lg:flex-row lg:w-[82%] w-full md:w-[90%] flex-wrap mt-8 gap-6">
        <div className="lg:w-[48%] w-full max-h-[70vh]">
          <img
            src={data?.data?.urls?.regular}
            alt={data?.data?.alt_description || "Image"}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="info w-full lg:w-[45%]">
          <div className="flex items-center gap-4 font-bold text-xl mb-4">
            <img
              src={data.data.user.profile_image.medium}
              className="w-[60px] h-[60px] rounded-full"
              alt={`${data.data.user.first_name} ${data.data.user.last_name}`}
            />
            <div className="text-white">
              {data.data.user.first_name} {data.data.user.last_name}
            </div>
          </div>
          <div className="text-white">
            <div className="bg-yellow-500 text-black font-bold w-[140px] h-[40px] flex justify-center items-center rounded-lg mb-4">
              Total likes: {data.data.likes}
            </div>
            <div className="bg-yellow-500 text-black font-bold w-[210px] h-[40px] flex justify-center items-center rounded-lg mb-4">
              Total downloads: {data.data.downloads}
            </div>
            <div className="mb-4 cursor-pointer">
              <label htmlFor="Language" className="mr-2 cursor-pointer">
                Choose Language:
              </label>
              <select
                id="Language"
                name="Language"
                className="px-2 py-1 rounded-lg border text-black cursor-pointer"
                value={Language}
                onChange={(e) => SetLanguage(e.target.value)}
              >
                {slugkey.map((language) => (
                  <option
                    key={language}
                    value={language}
                    className="cursor-pointer"
                  >
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div >
              <p>{ExtractedText.join(',').split(',').join(' ')}</p>
            </div>
            <div className="text-yellow-500">
              <p>{data.data.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full lg:w-[82%] md:w-[90%] p-2">
        {Array.isArray(data?.data?.related_collections?.results) &&
          data.data.related_collections.results.map((result) =>
            result.preview_photos.map((photo) => (
              <div
                key={photo.id}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
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
    </div>
  );
}

export default GetSinglePhoto;
