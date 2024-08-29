
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router-dom";
function SharedCom()
{
    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )

}

export default SharedCom;