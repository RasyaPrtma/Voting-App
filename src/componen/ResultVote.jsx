import { useEffect, useState } from "react";
import { getCandidate, resultVote } from "../api";

export default function ResultVote(){
    const [vote,setVote] = useState([]);
    const [Candidate,setCandidate] = useState([]);
    const [jumlah,setJumlah] = useState(0); 

    
    const handleCandidate = async () => {
        const Candidate = await getCandidate() ?? null;
        if(Candidate !== null){
            setCandidate(Candidate.data.data.candidates);
        }
    }

    const handleVoteCount = async () => {
        const vote = await resultVote();
        if(vote.status === 200){
            setVote(vote.data.data.vote_result);
        let num = 0
        for(let votes of vote.data.data.vote_result){
            num += votes.vote_count
        }
        setJumlah(num)
        }
    }

    useEffect(() => {
        handleCandidate()
        handleVoteCount()
    },[])

    return(
        <>
         <div className="flex flex-wrap mx-auto justify-center mt-[10rem] gap-3">
        {vote.length > 0
          ? vote.map((e) => (
              <ul
                key={e.candidates_id}
                className="flex gap-5 w-auto bg-[#00aeff7b] px-10 py-5 rounded-lg flex-col"
              >
                <img width={80} src={Candidate.find((f) => f.id === e.candidates_id).thumbnail ?? null} alt="thumbnail" />
                <div className="flex flex-col">
                  <li className="text-white font-bold">Nama : {Candidate.find((f) => f.id === e.candidates_id).nama ?? null}</li>
                  <li className="text-white font-bold">
                    Nomor Urut: {Candidate.find((f) => f.id === e.candidates_id).no_urut ?? null}
                  </li>
                </div>
                <div className="bg-[white]" width={(e.vote_count/jumlah) * 100 } >{(e.vote_count/jumlah) * 100}%</div>
              </ul>
              
            ))
          : <h1 className="text-[3rem] text-[#00aeff7b] font-bold my-10">Belum Ada Yang Vote</h1>}
      </div>
        </>
    );
}