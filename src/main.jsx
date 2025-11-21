// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Navigate } from 'react-router-dom'
import { HashRouter , Route,Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  </HashRouter>
)
