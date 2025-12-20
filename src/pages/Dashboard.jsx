import { React } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/Lixiphile.png'
function Dashboard(){
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate =useNavigate()

    const logout=()=>{
        localStorage.removeItem("user")
        navigate("/")
    }

    return(
    <>
    <div >

        {/* Header */}
        <div className="relative w-full">
             <img
                            src={logo}
                            alt="App Logo"
                            className="absolute left-3 sm:left-6
                                       top-1/2 -translate-y-1/2
                                       h-10 sm:h-14
                                       w-auto object-contain"
                        />

            <h1 className="italic flex justify-center items-center h-24 sm:h-28
                           bg-linear-to-r from-[#2563eb] to-[#1d4ed8]
                           text-white text-3xl sm:text-4xl font-bold tracking-wide shadow-lg">
                Dashboard
                <img
                src={logo}
                alt="App Logo"
                className="absolute
                           left-4
                           top-3
                           h-25 w-50
                           
                          
                          
                          "
              />


            </h1>
           


            {/* Nav */}
            <nav className="absolute -bottom-6 left-1/2 -translate-x-1/2
                            sm:left-auto sm:right-10 sm:translate-x-0
                            bg-white/80 backdrop-blur-md
                            px-4 sm:px-6 py-3 rounded-2xl shadow-xl
                            flex flex-wrap justify-center gap-4 sm:gap-6
                            text-gray-800 font-medium">
                
                <Link className="hover:text-[#2563eb]" to='/progress'>Progress</Link>
                <Link to='/profile' className="hover:text-[#2563eb]">Profile</Link>
                <button onClick={logout} className="hover:text-red-500 transition">
                    Logout
                </button>
            </nav>
        </div>
        
        

        {/* Welcome Card */}
        <div className="max-w-5xl mx-auto mt-28 sm:mt-24
                        p-6 sm:p-10
                        bg-white rounded-3xl shadow-2xl
                        border border-[#3b82f6]">
            <h1 className="text-3xl sm:text-4xl font-semibold italic text-[#2563eb] mb-4">
                Hello, {user.name} 👋  
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Let's grow your vocabulary one word at a time.
                Add new words, learn their meanings, and use them confidently.
                Practice daily and watch your language skills improve 🚀
            </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-16 sm:mt-20 px-4">

            <Link
                to='/addword'
                className="group w-40 sm:w-48 h-28 sm:h-32 rounded-3xl
                           bg-linear-to-br from-blue-500 to-blue-700
                           flex flex-col justify-center items-center
                           text-white text-xl sm:text-2xl font-semibold
                           shadow-xl hover:scale-105 transition-all">
                ➕
                <span className="mt-2 group-hover:underline">Add Word</span>
            </Link>

            <Link
                to='/wordlist'
                className="group w-40 sm:w-48 h-28 sm:h-32 rounded-3xl
                           bg-linear-to-br from-emerald-500 to-emerald-700
                           flex flex-col justify-center items-center
                           text-white text-xl sm:text-2xl font-semibold
                           shadow-xl hover:scale-105 transition-all">
                📘
                <span className="mt-2 group-hover:underline">Word List</span>
            </Link>

            <Link
                to='/quiz'
                className="group w-40 sm:w-48 h-28 sm:h-32 rounded-3xl
                           bg-linear-to-br from-sky-500 to-indigo-600
                           flex flex-col justify-center items-center
                           text-white text-xl sm:text-2xl font-semibold
                           shadow-xl hover:scale-105 transition-all">
                🧠
                <span className="mt-2 group-hover:underline">Quiz</span>
            </Link>


            

        </div>
       

    </div>
    </>
    )
}

export default Dashboard
