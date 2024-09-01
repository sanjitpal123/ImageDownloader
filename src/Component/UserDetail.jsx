import { useLocation } from "react-router-dom";
function UserDetails() {
  const location = useLocation();
  const data = location.state?.data;
  console.log("user", data);

  if (!data) {
    return <div>Loading...</div>; // or handle the error
  }

  return (
    <div className="min-h-[100vh] bg-black">
    <div className="bg-black min-h-[40vh] w-full  flex justify-center items-center">
      <div className="w-[80%]  h-full mt-20">
        <div className="flex  items-center gap-2  sm:gap-3">
        
          <img
            src={data.user.profile_image.large}
            className="sm:h-[100px] sm:w-[100px] h-[60px] w-[60px] rounded-full object-cover"
          />
          <span className="font-bold sm:text-3xl text-white">{data.user.name}</span>
        </div>
        <div className="sm:w-[50%] ml-4 text-yellow-500">{data.user.bio}</div>
      </div>
    </div>
    </div>
  );
}
export default UserDetails;
