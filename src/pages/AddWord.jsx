import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddWord(){
    const [form,setForm]=useState({word:"",Meaning:"",Example:""})
    const [ad,setAd]=useState(false)

    const change=(e)=>{
        let {name,value}=e.target
        setForm({...form,[name]:value})
    }
        
    const sub=async(e)=>{
        e.preventDefault()
        const {id} = JSON.parse(localStorage.getItem("user"))

        if (!form.word || !form.Meaning || !form.Example) {
            alert("Please fill all fields")
            return
        }
            
        let wrd={id:Date.now(),...form,u_id:id}
        await axios.post('https://vocabbackend-5h4t.onrender.com/words',wrd)
        setForm({word:"",Meaning:"",Example:""})
        setAd(true)
    }

    return(
        <>
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-[#ae24f6]"> 

            {/* Header */}
            <div className="relative bg-[#641c93] text-white italic
                            h-24 sm:h-32
                            flex flex-col justify-center items-center shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Add a New Word !!!
                </h1>
                <p className="text-xs sm:text-sm mt-1 text-center px-4">
                    “Awesome! Small efforts today build strong vocabulary tomorrow.”
                </p>

                <Link
                    to="/dashboard"
                    className="absolute left-4 sm:left-6 bottom-3 sm:bottom-4
                               bg-white text-[#641c93]
                               px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
                               border border-[#ae24f6]
                               shadow-md hover:bg-violet-200 transition"
                >
                    ← Back
                </Link>
            </div>

            {/* Form */}
            <form
                onSubmit={sub}
                className="bg-white max-w-md sm:max-w-lg
                           mx-auto mt-12 sm:mt-20
                           p-6 sm:p-10
                           border-2 border-[#ae24f6]
                           rounded-3xl shadow-2xl
                           flex flex-col space-y-5
                           text-base sm:text-xl"
            >
                <input
                    placeholder="Word"
                    value={form.word}
                    name="word"
                    onChange={change}
                    className="border-2 p-2 rounded-lg
                               focus:outline-none focus:border-[#ae24f6]"
                />

                <input
                    placeholder="Meaning"
                    value={form.Meaning}
                    name="Meaning"
                    onChange={change}
                    className="border-2 p-2 rounded-lg
                               focus:outline-none focus:border-[#ae24f6]"
                />

                <textarea
                    placeholder="Example"
                    value={form.Example}
                    name="Example"
                    onChange={change}
                    className="border-2 p-2 rounded-lg
                               focus:outline-none focus:border-[#ae24f6]"
                />

                <button
                    type="submit"
                    className="self-center mt-4
                               border-2 border-black
                               px-6 sm:px-8 py-2 rounded-3xl
                               bg-[#641c93] hover:bg-amber-50
                               transition"
                >
                    {ad ? "Added" : "Add"}
                </button>
            </form>

        </div>
        </>
    )
}

export default AddWord
