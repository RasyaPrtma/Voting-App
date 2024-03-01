/* eslint-disable react/prop-types */
import { useState } from "react";

export default function FormAddCandidate({onAdd}){
    const [nama,setNama] = useState("")
    const [thumbnail,setThumbnail] = useState("")
    const [noUrut,setNoUrut] = useState("");

    const handleClick = () => {
        const konfirm = confirm("Apakah anda ingin menambah?");
        if(konfirm){
            onAdd(nama,thumbnail,noUrut)
            setNama('')
            setThumbnail('')
            setNoUrut('')
        }
    }

    return(
        <>
             <div className="bg-[#00aeff] w-[400px] h-[450px] flex flex-col items-center justify-center mt-[6rem] mx-auto rounded-md">
                <h1 className="text-white font-bold text-[1.5rem]">Form Tambah Candidate</h1>
                <div>
                    <label htmlFor="Nama" className="block text-white font-bold text-[1rem] mt-5">Nama</label>
                    <input className="outline-none w-[300px] py-1 rounded-sm pl-2" type="text" autoComplete="off" id="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Thumbnail" className="block text-white font-bold text-[1rem] mt-5">Thumbnail</label>
                    <input className="outline-none w-[300px] py-1 rounded-sm pl-2" type="text" autoComplete="off" id="Thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Nomor_Urut" className="block text-white font-bold text-[1rem] mt-5">Nomor Urut</label>
                    <input className="outline-none w-[300px] py-1 rounded-sm pl-2" type="text" autoComplete="off" id="Nomor_Urut" value={noUrut} onChange={(e) => setNoUrut(e.target.value)} />
                </div>
                <button className="mt-5 bg-white px-5 py-2 rounded-3xl font-bold text-[#00aeff]" onClick={handleClick}>Tambah</button>
            </div>
        </>
    );
}