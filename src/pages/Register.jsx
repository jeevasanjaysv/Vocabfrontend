import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from '../assets/Lixiphile.png'


function Register(){
    const [form,setForm]=useState({name:"",email:"",pass:""})
    const [isExist, setIsExist] = useState(false)
    const navigate =useNavigate()

    const change=(e)=>{
        let {name,value}=e.target
        setForm({...form,[name]:value})
        if (name === "email") {
            setIsExist(false)
        }
    }

    const sub=async(e)=>{
        e.preventDefault()
        let e_mail= form.email.trim()
        let chk= await axios.get(
            `https://vocabbackend-5h4t.onrender.com/users/byEmail?email=${e_mail}`
        )

        if (chk.data.length !== 0) {
            setIsExist(true)
            return
        }

        setIsExist(false)
        let u = { id: Date.now(), ...form }
        await axios.post('https://vocabbackend-5h4t.onrender.com/users', u)
        setForm({ name: "", email: "", pass: "" })
        navigate("/")
    }

    return(
    <>
    <div >

        {/* Header */}
        <h1 className="flex justify-center items-center h-28
                       bg-[#2563eb] text-white text-3xl
                       italic font-semibold shadow-lg">
            Registration
            <img
            src={logo}
            alt="App Logo"
            className="absolute
                        left-4
                        top-2
                        h-25 w-60"
            />

        </h1>

        {/* Register Card */}
        <div className="flex justify-center mt-20">
            <form
                onSubmit={sub}
                className="flex flex-col bg-white
                           w-112.5 p-10
                           border-2 border-[#3b82f6]
                           rounded-3xl shadow-2xl
                           space-y-6 text-xl"
            >

                <p className="text-center italic text-gray-600">
                    “Start your journey today — every great learner begins here”
                </p>

                <input
                    placeholder="Name"
                    value={form.name}
                    name="name"
                    onChange={change}
                    className="border-2 p-3 rounded-xl
                               focus:outline-none focus:border-[#2563eb]"
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    name="email"
                    onChange={change}
                    className="border-2 p-3 rounded-xl
                               focus:outline-none focus:border-[#2563eb]"
                />

                {isExist && (
                    <p className="text-red-500 text-sm -mt-3">
                        Email already exists
                    </p>
                )}

                <input
                    placeholder="Password"
                    value={form.pass}
                    name="pass"
                    onChange={change}
                    type="password"
                    className="border-2 p-3 rounded-xl
                               focus:outline-none focus:border-[#2563eb]"
                />

                <button
                    type="submit"
                    className="mx-auto
                               border-2 border-black
                               px-8 py-2 rounded-3xl
                               bg-[#2563eb] text-white
                               hover:bg-[#1d4ed8]
                               transition"
                >
                    Register
                </button>
            </form>
        </div>

        {/* Login redirect */}
        <div className="text-center mt-6">
            <button
                onClick={()=>{navigate("/")}}
                className="text-lg text-gray-600 hover:text-[#2563eb]"
            >
                Already have an account? <span className="font-semibold">Login</span>
            </button>
        </div>

    </div>
    </>
    )
}

export default Register
