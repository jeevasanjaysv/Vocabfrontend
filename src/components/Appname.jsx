import React from "react";
import logo from '../assets/Lixiphile.png'

function Appname(){
    return(
        <>
        <div className="relative h-24 bg-[#2563eb] shadow-lg">
        <img
        src={logo}
        alt="App Logo"
        className="absolute
                   left-4
                   bottom-5
                   h-10 w-10
                   object-contain
                   bg-white
                   p-1
                   rounded-xl
                   shadow-md"
      />

        </div>


        </>
    )

}
export default Appname;