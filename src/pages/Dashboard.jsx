import { React } from "react"
import { Link, useNavigate } from "react-router-dom"

function Dashboard(){
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate =useNavigate()

    const logout=()=>{
        localStorage.removeItem("user")
        navigate("/")
    }

    return(
    <>
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-[#ae24f6]">

        {/* Header */}
        <div className="relative w-full">
            <h1 className="italic flex justify-center items-center h-24 sm:h-28
                           bg-linear-to-r from-[#ae24f6] to-[#641c93]
                           text-white text-3xl sm:text-4xl font-bold tracking-wide shadow-lg">
                Dashboard
            </h1>

            {/* Nav */}
            <nav className="absolute -bottom-6 left-1/2 -translate-x-1/2
                            sm:left-auto sm:right-10 sm:translate-x-0
                            bg-white/80 backdrop-blur-md
                            px-4 sm:px-6 py-3 rounded-2xl shadow-xl
                            flex flex-wrap justify-center gap-4 sm:gap-6
                            text-gray-800 font-medium">
                
                <Link className="hover:text-[#ae24f6]" to='/progress'>Progress</Link>
                <Link to='/profile' className="hover:text-[#ae24f6]">Profile</Link>
                <button onClick={logout} className="hover:text-red-500 transition">
                    Logout
                </button>
            </nav>
        </div>

        {/* Welcome Card */}
        <div className="max-w-5xl mx-auto mt-28 sm:mt-24
                        p-6 sm:p-10
                        bg-white rounded-3xl shadow-2xl
                        border border-[#ae24f6]">
            <h1 className="text-3xl sm:text-4xl font-semibold italic text-[#ae24f6] mb-4">
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
                           bg-linear-to-br from-blue-500 to-indigo-500
                           flex flex-col justify-center items-center
                           text-white text-xl sm:text-2xl font-semibold
                           shadow-xl hover:scale-105 transition-all">
                ➕
                <span className="mt-2 group-hover:underline">Add Word</span>
            </Link>

            <Link
                to='/wordlist'
                className="group w-40 sm:w-48 h-28 sm:h-32 rounded-3xl
                           bg-linear-to-br from-green-500 to-emerald-500
                           flex flex-col justify-center items-center
                           text-white text-xl sm:text-2xl font-semibold
                           shadow-xl hover:scale-105 transition-all">
                📘
                <span className="mt-2 group-hover:underline">Word List</span>
            </Link>

            <Link
                to='/quiz'
                className="group w-40 sm:w-48 h-28 sm:h-32 rounded-3xl
                           bg-linear-to-br from-purple-500 to-pink-500
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
