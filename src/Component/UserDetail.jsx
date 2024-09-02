import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchDownload from "../Services/FetchDownloadPhoto";
import FetchCollection from "../Services/FetchCollectionOfUser";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const Navigator=useNavigate()
  const location = useLocation();

  const data = location.state?.data;
  console.log("user", data);
  const [Clicked, SetClick] = useState(false);
  console.log("data.user", data.user.total_collections);
  const [SelectItem, SetSelectItem] = useState("Total_Collection");
  const[Response, SetResponse]=useState(null)
  if (!data) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    console.log(SelectItem);
    async function fetch() {
      const response = await FetchCollection(data.user.username);
      SetResponse(response.data)
     
    }
    fetch();
  }, [SelectItem]);

  function HandleDropDown() {
    SetClick(!Clicked);
  }
  async function downloadfn(photo) {
    const id = photo.id;

    if (!id) {
      console.error("ID not found for the item");
      return;
    }

    try {
      const response = await FetchDownload(id);
      const urlofdown = response.data.url;

      const imageResponse = await fetch(urlofdown);
      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error during download:", error);
    }
  }
  function GoingTogetSingleimg(id) {
    Navigator(`/photo/${id}`);
  }

  let aval = data.user.for_hire;

  return (
    <div className="min-h-[100vh] bg-black">
      <div className="bg-black min-h-[40vh]  w-full flex flex-wrap justify-center ">
        <div className="w-full lg:w-[38%] mx-2 h-full mt-20 my-2 ">
          <div className="flex items-center  gap-2 sm:gap-3">
            <img
              src={data.user.profile_image.large}
              className="sm:h-[100px] sm:w-[100px] h-[60px] w-[60px] rounded-full object-cover mx-2"
              alt="User Profile"
            />
            <span className="font-bold sm:text-3xl text-white">
              {data.user.name}
            </span>
          </div>
          <div className="sm:w-[80%] ml-4 text-yellow-500">{data.user.bio}</div>
          {aval && <div className="text-white font-bold mx-5">Available</div>}
          {data.user.portfolio_url && (
            <div className="text-yellow-500 mx-5">
              <a href={data.user.portfolio_url}>Visit Portfolio</a>
            </div>
          )}
          <div className="dropdown mt-4 mx-3">
            <button
              className="w-[130px] sm:w-[200px] h-[50px] rounded-md bg-yellow-500 black font-bold"
              onClick={HandleDropDown}
            >
              Social Media
            </button>
            {Clicked && (
              <div className="bg-yellow-500  mt-1 p-2  ">
                {data.user.social?.instagram_username && (
                  <div className="text-start font-bold rounded-md">
                    <a
                      href={`https://instagram.com/${data.user.social.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2"
                    >
                      <span>Instagram:</span>{" "}
                      {data.user.social.instagram_username}
                    </a>
                  </div>
                )}
                {data.user.social?.twitter_username && (
                  <div className="text-start font-bold rounded-md">
                    <a
                      href={`https://twitter.com/${data.user.social.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2"
                    >
                      Twitter: {data.user.social.twitter_username}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className=" w-full lg:w-[60%]  h-full mt-10 sm:mt-20 ">
          <select
            className="w-[50%] mx-2 md:w-[20%] flex gap-2 px-2 py-3 font-bold cursor-pointer flex-wrap text-[12px] md:text-1xl "
            value={SelectItem}
            onChange={(e) => SetSelectItem(e.target.value)}
          >
            <option className="w-[180px] rounded-md h-[40px] font-bold bg-white text-black">
              Total_Collection
            </option>
            <option className="w-[180px] rounded-md h-[40px] font-bold bg-white text-black">
              Total_Liked_Photo
            </option>
            <option className="w-[180px] rounded-md h-[40px] font-bold bg-white text-black">
              Total_Photo
            </option>
          </select>
          {}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full lg:w-[82%] md:w-[90%] p-2">
            { Response &&
              Response.map((result) =>
                result.preview_photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  onClick={()=>GoingTogetSingleimg(photo.id)} >
                    <img
                      src={photo.urls.regular}
                      className="w-full h-full object-cover"
                      alt={photo.alt_description || "Image"}
                    />
                    <div className="absolute bottom-2 left-1 flex items-center">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          downloadfn(photo);
                        }}
                        className="relative text-black bg-white px-2 py-1 rounded-full group"
                      >
                        <i className="fa-regular fa-circle-down text-black"></i>
                        <span className="absolute bottom-full mb-2 left-8 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Download Image
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
