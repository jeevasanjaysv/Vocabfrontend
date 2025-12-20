import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import {Route,Routes} from "react-router-dom"
import AddWord from "./pages/AddWord";
import VocabularyList from "./pages/VocabularyList";
import Protected from "./components/Protected";
import Profile from "./pages/profile";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import AnimatedBackground from "./components/AnimatedBackground";
import Appname from "./components/Appname";
function App(){
  return (
    <>
    <AnimatedBackground/>
   
    <Routes>
      <Route path="/" element={<Login/>}/>

      <Route path="/register" element={ <Register/> }/>

      <Route path="/dashboard" element={<Protected><Dashboard/> </Protected>}/>

      <Route path="/addword" element={ <Protected><AddWord/> </Protected>}/>

      <Route path="/wordlist" element={ <Protected><VocabularyList/></Protected>}/>

      <Route path="/quiz" element={ <Protected><Quiz/></Protected>}/>

      <Route path="/profile" element={<Protected><Profile /></Protected>}/>

      
      <Route path="/progress" element={<Protected> <Progress /> </Protected>}/>



    </Routes>

    </>
  )
}
export default App