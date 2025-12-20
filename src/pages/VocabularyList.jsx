import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from '../assets/Lixiphile.png'

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
        <div >

            {/* Header */}
            <div className="relative sm:h-24 bg-[#2563eb] flex justify-center items-center shadow-lg  ">
                 <img
                                src={logo}
                                alt="App Logo"
                                className="absolute left-3 sm:left-6
                                           top-1/2 -translate-y-1/2
                                           h-10 sm:h-14
                                           w-auto object-contain"
                            />
                
                <h1 className="text-2xl sm:text-3xl italic font-semibold text-white">
                    Word List
                     <img
                        src={logo}
                        alt="App Logo"
                        className="absolute
                                    left-4
                                    bottom-2
                                    h-25 w-50 "
                        />


                </h1>

                <Link
                   to="/dashboard"
                   className="absolute left-4 sm:left-6 bottom-3 sm:bottom-2
                              bg-white text-[#2563eb]
                              px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
                              border border-[#3b82f6]
                              shadow-md hover:bg-blue-100 transition">
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
                               focus:outline-none focus:border-[#2563eb]
                               hover:bg-blue-100"
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
                        className="w-full border-2 p-2 rounded-lg
                                   focus:border-[#2563eb] focus:outline-none"
                    />
                    <input
                        placeholder="Meaning"
                        value={form.Meaning}
                        name="Meaning"
                        onChange={Uchange}
                        className="w-full border-2 p-2 rounded-lg
                                   focus:border-[#2563eb] focus:outline-none"
                    />
                    <textarea
                        placeholder="Example"
                        value={form.Example}
                        name="Example"
                        onChange={Uchange}
                        className="w-full border-2 p-2 rounded-lg
                                   focus:border-[#2563eb] focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="block mx-auto
                                   px-6 sm:px-8 py-2 rounded-3xl
                                   bg-[#2563eb] text-white
                                   border-2 border-black
                                   hover:bg-[#1d4ed8] transition"
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
                                           bg-[#2563eb] text-white
                                           hover:bg-[#1d4ed8] transition"
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
