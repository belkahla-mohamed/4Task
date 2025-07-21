import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { TranslationProvider } from '@/components/translation-provider'
import "./App.css"
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Auth/Profile'
import Achievements from './pages/Achievement'
import Dashboard from './pages/dashboard'
import Chat from './pages/ai'

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achievement" element={<Achievements />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  )
}

export default App
