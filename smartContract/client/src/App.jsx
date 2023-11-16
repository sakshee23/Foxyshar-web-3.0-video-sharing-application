import React, { useState } from 'react'
import SignUp from './components/SignUp'
import ProfileSetup from './components/ProfileSetup'
import Video from './components/Video'
import FoxyShare from './components/FoxyShare'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Wallet from './components/Wallet'


function App() {

  const [state, setState] = useState({
    web3: null,
    contract: null
  });

  const saveState = (state) => {
    setState(state);
  }

  const currentPath = window.location.pathname;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp saveState={saveState} />} />
        <Route path="/foxyshare" element={<FoxyShare state={state} />} />

        <Route path="foxyshare/video" element={<Video state={state} />} />
        <Route path="/profilesetup" element={<ProfileSetup state={state} />} />
      </Routes>

      {/* Conditionally render Wallet component based on the current route */}
      {currentPath !== '/' && <Wallet saveState={saveState} />}
    </Router>
  )
}

export default App


// https://famousfoxes.com/logo.b8610686.svg