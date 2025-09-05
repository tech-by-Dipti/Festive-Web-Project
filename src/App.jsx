import React from 'react'
import { Routes, Route } from "react-router-dom";
// import Home from "./Components/Home/Home";
import IntroPage from './Components/IntroPage';
import Celebration from './Components/Celebration';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage/>} />
      <Route path="/Celebration" element={<Celebration/>} />

      
    </Routes>
  )
}

export default App
