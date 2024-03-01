/* eslint-disable react/prop-types */
export default function ResultCandidate({data,onEdit,onDelete}){

    const handleDelete = (id) =>{
        const konfirm = confirm("Apakah anda yakin?")
        if(konfirm){
            onDelete(id)
        }
    }
    return(
        <>
      <div className="flex flex-wrap mx-auto justify-center mt-[10rem] gap-3">
            {data.length > 0
          ? data.map((e) => (
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
                <div className="flex flex-col gap-2">
                <button
                  onClick={() => onEdit(e.id)}
                  className="text-white bg-green-600 font-bold px-5 py-2 rounded-3xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="text-white bg-red-600 font-bold px-5 py-2 rounded-3xl"
                >
                  Delete
                </button>
                </div>
              </ul>
            ))
          : <h1 className="text-[3rem] text-[#00aeff7b] font-bold my-10">Belum Ada Candidate</h1>}
          </div>
        </>
    );
}