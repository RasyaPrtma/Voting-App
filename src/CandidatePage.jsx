/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FormAddCandidate from "./componen/FormAddCandidate";
import ResultCandidate from "./componen/ResultCandidate";
import FormEditCandidate from "./componen/FormEditCandidate";
import { addCandidate, deleteCandidate, getCandidate, updateCandidate } from "./api";
import { Link } from "react-router-dom";

export default function CandidatePage({onLogout}){

    const [isEdit,setIsEdit] = useState(null);
    const [Candidate,setCandidate] = useState([]);

    const handleEdit = (id) => {
       return setIsEdit(id)
    }

    const handleCancelEdit = () => {
        return setIsEdit(null);
    }

    const handleCandidate = async () => {
        const Candidate = await getCandidate();
        setCandidate(Candidate.data.data.candidates);
    }

    const handleAddCandidate = async (nama,thumbnail,noUrut) => {
        const addCandidates = await addCandidate(nama,thumbnail,noUrut);
        console.log(addCandidates)
        if(addCandidates.status === 201){
            alert(addCandidates.data.message);
            handleCandidate()
        }else{
            const {name = [],thumbnail = [],no_urut = []} = addCandidates.data.errors;
            const err = [...name,...thumbnail,...no_urut]
            alert(err.join('\n'))
        }
    }

    const handleEditCandidate = async (nama,thumbnail,noUrut) => {
        const editCandidate = await updateCandidate(nama,thumbnail,noUrut,isEdit);
        if(editCandidate.status === 200){
            alert(editCandidate.data.message)
            handleCandidate()
        }else{
            alert(editCandidate.data.message);
        }
    }

    const handleDeleteCandidate = async (id) => {
        const deleteCandidates = await deleteCandidate(id);
        if(deleteCandidates.status === 200){
            alert(deleteCandidates.data.message)
            handleCandidate()
        }else if(deleteCandidates.status === 404){
            alert(deleteCandidates.data.message)
        }else{
            alert('tidak bisa menghapus candidate')
        }
    }

    useEffect(() => {
        handleCandidate()
    },[])

    return( 
        <>
        <div className="bg-[#00aeff] flex items-center justify-around py-5">
                <Link to={"/login"}><h1 className="text-white font-bold text-[1.2rem]">Vote App</h1></Link>
                <nav className="flex gap-5">
                    <Link><li onClick={() => onLogout()} className="list-none text-white font-semibold text-[1.3rem]">Logout</li></Link>
                </nav>
            </div>
            {
                isEdit !== null ?
                <FormEditCandidate onCancel={handleCancelEdit} onEdit={handleEditCandidate} targetCandidate={Candidate.filter((e) => e.id === isEdit)[0]}/> 
                :<FormAddCandidate onAdd={handleAddCandidate}/>
            }  
            <ResultCandidate onDelete={handleDeleteCandidate} data={Candidate} onEdit={handleEdit}/>
        </>
    );
}