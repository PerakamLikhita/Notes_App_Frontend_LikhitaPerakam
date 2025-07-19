import React from 'react'
import Home from './pages/Home/home'
import Login from './pages/Login/login';
import SignUp from './pages/SignUp/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
