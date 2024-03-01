/* eslint-disable react/prop-types */
import { Link, Outlet } from "react-router-dom";

export default function Layout({onLogout}){
    return(
        <>
         <div className="bg-[#00aeff] flex items-center justify-around py-5">
                <Link to={"/login"}><h1 className="text-white font-bold text-[1.2rem]">Vote App</h1></Link>
                <nav className="flex gap-5">
                    <Link to={"/vote"}><li className="list-none text-white font-semibold text-[1.3rem]">Vote</li></Link>
                    <Link to={"/result"}><li className="list-none text-white font-semibold text-[1.3rem]">Result</li></Link>
                    <Link><li onClick={() => onLogout()} className="list-none text-white font-semibold text-[1.3rem]">Logout</li></Link>
                </nav>
            </div>
            <Outlet/>
        </>
    );
}