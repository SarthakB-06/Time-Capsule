import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginAndRegister from './pages/LoginAndRegister'
import axios from 'axios';
import { BrowserRouter  as Router , Route , Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CreateCapsule from './pages/CreateCapsule';

function App() {
  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateCapsule />} />
      </Routes>
    </Router>
  )
}

export default App
