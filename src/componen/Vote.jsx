import { useEffect, useState } from "react";
import { Voting, getCandidate } from "../api";

export default function Vote() {
  const [Candidate, setCandidate] = useState([]);

  const handleCandidate = async () => {
    const Candidate = await getCandidate();
    setCandidate(Candidate.data.data.candidates);
  };

  const handleVote = async (id) => {
    const konfirm = confirm("Apakah anda yakin?");
    if (konfirm) {
      const Vote = await Voting(id);
      if (Vote.status === 201) {
        alert(Vote.data.message);
      } else if (Vote.status === 400) {
        alert(Vote.data.message);
      } else {
        alert(Vote.data.message);
      }
    }
  };

  useEffect(() => {
    handleCandidate();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mx-auto justify-center mt-[10rem] gap-3">
        {Candidate.length > 0
          ? Candidate.map((e) => (
              <ul
                key={e.id}
                className="flex items-center gap-5 w-auto bg-[#00aeff7b] px-10 py-5 rounded-lg"
              >
                <img width={80} src={e.thumbnail} alt="thumbnail" />
                <div className="flex flex-col">
                  <li className="text-white font-bold">Nama : {e.nama}</li>
                  <li className="text-white font-bold">
                    Nomor Urut: {e.no_urut}
                  </li>
                </div>
                <button
                  onClick={() => handleVote(e.id)}
                  className="text-white bg-green-600 font-bold px-5 py-2 rounded-3xl"
                >
                  Pilih
                </button>
              </ul>
            ))
          : <h1 className="text-[3rem] text-[#00aeff7b] font-bold my-10">Belum Ada Candidate</h1>}
      </div>
    </>
  );
}
