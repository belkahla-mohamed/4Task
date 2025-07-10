import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/page'
import { TranslationProvider } from '@/components/translation-provider'
import "./App.css"
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  )
}

export default App
