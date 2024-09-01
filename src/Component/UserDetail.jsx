import { useLocation } from "react-router-dom";
function UserDetails() {
    const location = useLocation();
    const data = location.state?.data;  
    console.log("user", data); 

    if (!data) {
        return <div>Loading...</div>; // or handle the error
    }

    return (
        <div className="bg-black min-h-[100vh] flex justify-center items-center">
            <div className="w-[400px] bg-white h-[300px] flex justify-center items-center">
                <img src={data.user.profile_image.small} className="h-[50px] w-[50px] object-cover"/>
            </div>
        </div>
    );
}
export default UserDetails;
