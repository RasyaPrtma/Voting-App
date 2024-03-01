import { Link, Outlet } from "react-router-dom";

export default function DefaultPage(){
    return(
        <>
            <div className="bg-[#00aeff] flex items-center justify-around py-5">
                <Link to={"/login"}><h1 className="text-white font-bold text-[1.2rem]">Vote App</h1></Link>
                <nav>
                    <Link to={"/resultVote"}><li className="list-none text-white font-semibold text-[1.3rem]">Result</li></Link>
                </nav>
            </div>
            <Outlet/>
        </>
    );
}