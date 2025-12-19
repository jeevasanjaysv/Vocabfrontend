import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function VocabularyList(){
    const [wrd,setWrd]=useState([])
    const {id} = JSON.parse(localStorage.getItem("user"))
    const [form,setForm]=useState({word:"",Meaning:"",Example:""})
    const [up,setUp]=useState({dis:false,Uid:""})
    const [search,setSearch]=useState("")

    const Uchange=(e)=>{
        let {name,value}=e.target
        setForm({...form,[name]:value})
    }

    useEffect(()=>{
        fetch()
    },[])

    const fetch=async()=>{
        const d=await axios.get(`https://vocabbackend-5h4t.onrender.com/words?u_id=${id}`)
        setWrd(d.data)   
    }
      
    const deletes=async(Eid)=>{
        await axios.delete(`https://vocabbackend-5h4t.onrender.com/words/${Eid}`)
        fetch()
    }

    const Usub=async(e)=>{
        e.preventDefault();
        let uform={id:Date.now(),...form,u_id:id}
        await axios.put(`https://vocabbackend-5h4t.onrender.com/words/${up.Uid}`,uform)
        fetch()
        setUp({dis:false,Uid:""})
    }

    return(
        <>
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-[#ae24f6]">

            {/* Header */}
            <div className="relative h-20 sm:h-24 bg-[#641c93] flex justify-center items-center shadow-lg">
                <h1 className="text-2xl sm:text-3xl italic font-semibold text-white">
                    Word List
                </h1>

                <Link
                   to="/dashboard"
                   className="absolute left-4 sm:left-6 bottom-3 sm:bottom-4
                              bg-white text-[#641c93]
                              px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
                              border border-[#ae24f6]
                              shadow-md hover:bg-violet-200 transition">
                    ← Back
                </Link>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mt-10 p-4 sm:p-6
                            bg-white rounded-3xl shadow-xl">
                <p className="text-center italic mb-2 text-gray-600 text-sm sm:text-base">
                    Type something to search
                </p>
                <input
                    value={search}
                    placeholder="Search"
                    onChange={(e)=>{setSearch(e.target.value)}}
                    className="w-full border-2 p-2 rounded-lg
                               focus:outline-none focus:border-[#ae24f6]
                               hover:bg-violet-100"
                />
            </div>

            {/* Update Form */}
            {up.dis === true && (
                <form
                    onSubmit={Usub}
                    className="max-w-xl mx-auto mt-10
                               bg-white p-5 sm:p-8 rounded-3xl
                               shadow-2xl space-y-4"
                >
                    <input
                        placeholder="Word"
                        value={form.word}
                        name="word"
                        onChange={Uchange}
                        className="w-full border-2 p-2 rounded-lg"
                    />
                    <input
                        placeholder="Meaning"
                        value={form.Meaning}
                        name="Meaning"
                        onChange={Uchange}
                        className="w-full border-2 p-2 rounded-lg"
                    />
                    <textarea
                        placeholder="Example"
                        value={form.Example}
                        name="Example"
                        onChange={Uchange}
                        className="w-full border-2 p-2 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="block mx-auto
                                   px-6 sm:px-8 py-2 rounded-3xl
                                   bg-blue-400 border-2 border-black
                                   hover:bg-amber-50 transition"
                    >
                        Update
                    </button>
                </form>
            )}

            {/* Word List */}
            <ol className="max-w-4xl mx-auto mt-12 space-y-4 px-4">
                {wrd
                .filter((w)=>w.word.toLowerCase().includes(search.toLowerCase()))
                .map((e,i)=>(
                    <li
                        key={i}
                        className="flex flex-col sm:flex-row
                                   justify-between sm:items-center
                                   gap-3
                                   bg-amber-100 border-2 border-black
                                   p-4 rounded-2xl
                                   text-base sm:text-xl shadow-md"
                    >
                        <span>
                            <strong>{e.word}</strong> — {e.Meaning}
                        </span>

                        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                            <button
                                onClick={()=>{deletes(e.id)}}
                                className="px-3 py-1 rounded-lg
                                           bg-red-400 text-white
                                           hover:bg-red-500 transition"
                            >
                                Delete
                            </button>

                            <button
                                onClick={()=>{
                                    setUp({dis:true,Uid:e.id})
                                    setForm({word:e.word,Meaning:e.Meaning,Example:e.Example})
                                }}
                                className="px-3 py-1 rounded-lg
                                           bg-[#641c93] text-white
                                           hover:bg-[#ae24f6] transition"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ol>

        </div>
        </>
    )
}

export default VocabularyList
