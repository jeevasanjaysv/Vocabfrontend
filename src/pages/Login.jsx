import axios from "axios"
import { useState } from "react"
import React from "react"
import { useNavigate, Link } from "react-router-dom"

function Login(){
    const [Lform,setLForm]=useState({email:"",pass:""})
    const navigate =useNavigate()
    const [nonExist,setNonExist] =useState(false)

    const change=(e)=>{
        let {name,value}=e.target
        setLForm({...Lform,[name]:value})
        if(name=="email"){
            setNonExist(false)
        }
    }

    const sub=async(e)=>{
        e.preventDefault()

        if (!Lform.email || !Lform.pass) {
            alert("Please fill all fields")
            return
        }
        const chk=await axios.get(`https://vocabbackend-5h4t.onrender.com/users/byEmail?email=${Lform.email}`)
        if(chk.data.length==0){
            setNonExist(true)
            return 

        }
        setNonExist(false)

        const u = await axios.get(
            `https://vocabbackend-5h4t.onrender.com/users?email=${Lform.email}&pass=${Lform.pass}`
        )
       

        if(u.data.length>0){
            alert("Login Successfully")
            localStorage.setItem("user", JSON.stringify(u.data[0]))
            navigate('/dashboard')
        } else {
            alert("Incorrect Password!!!!")
        }
    }

    return(
    <>
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-[#ae24f6]">

        
        <h1 className="flex justify-center items-center h-24
                       bg-[#641c93] text-white text-3xl
                       italic font-semibold shadow-lg">
            Login
        </h1>

       
        <div className="flex justify-center mt-20">
            <form
                onSubmit={sub}
                className="flex flex-col bg-white
                           w-112.5 p-10
                           border-2 border-[#ae24f6]
                           rounded-3xl shadow-2xl
                           space-y-6 text-xl"
            >

                <p className="text-center italic text-gray-600">
                    “Welcome ! Let’s continue your learning journey 📘”
                </p>

                <input
                    placeholder="Email"
                    value={Lform.email}
                    name="email"
                    onChange={change}
                    className="border-2 p-3 rounded-xl
                               focus:outline-none focus:border-[#ae24f6]"
                />
                {nonExist&& (
                    <p className="text-red-500 text-sm -mt-3">
                        Email not exists
                    </p>
                )}


                <input
                    placeholder="Password"
                    value={Lform.pass}
                    name="pass"
                    onChange={change}
                    type="password"
                    className="border-2 p-3 rounded-xl
                               focus:outline-none focus:border-[#ae24f6]"
                />

                <button
                    type="submit"
                    className="mx-auto
                               border-2 border-black
                               px-8 py-2 rounded-3xl
                               bg-[#641c93] hover:bg-amber-50
                               transition"
                >
                    Login
                </button>
            </form>
        </div>

        <div className="text-center mt-6">
            <Link
                to="/register"
                className="text-lg text-gray-600 hover:text-[#ae24f6] "
            >
                Don’t have an account? <span className="font-semibold">Register</span>
            </Link>
        </div>

    </div>
    </>
    )
}

export default Login
