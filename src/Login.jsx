/* eslint-disable react/prop-types */
import { useState } from "react";
import { Logins, setToken } from "./api";
import { useNavigate } from "react-router-dom";

export default function Login({onLoginSucces, isAdmin}){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const handleClick = async () => {
        const login = await Logins(email,password);
       if(email === "admin@voteapp.id" && password === "123" | 123){
            navigate("/admin")
            isAdmin(true)
            localStorage.setItem('admin','admin')
            setEmail("")
            setPassword("")
       }else{
        if(login.status === 200){
            setToken(login.data.data.accesToken)
            onLoginSucces(login.data.data.accesToken)
            alert(login.data.message)
            setEmail("")
            setPassword("")
        }else if(login.status === 400){
            const {email = [], password = [] } = login.data.errors;
            const err = [...email,...password]
            alert(err.join("\n"))
        }else{
            alert(login.data.message)
        }
       }
    }

    return(
        <>
            <div className="bg-[#00aeff] w-[400px] h-[450px] flex flex-col items-center justify-center mt-[6rem] mx-auto rounded-md">
                <h1 className="text-white font-bold text-[1.5rem]">Login</h1>
                <div>
                    <label htmlFor="Email" className="block text-white font-bold text-[1rem] mt-5">Email</label>
                    <input className="outline-none w-[300px] py-1 rounded-sm pl-2" type="email" autoComplete="off" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Password" className="block text-white font-bold text-[1rem] mt-5">Password</label>
                    <input className="outline-none w-[300px] py-1 rounded-sm pl-2" type="password" autoComplete="off" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="mt-5 bg-white px-5 py-2 rounded-3xl font-bold text-[#00aeff]" onClick={handleClick}>Login</button>
            </div>
        </>
    );
}