import { Wifi, WifiOff, CheckCircle, User, Trophy } from "lucide-react"
import { WifiStatus } from "../../components/wifi-status"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function DashboardHeader() {
  const navigate = useNavigate()
  const [hasUnclaimed, setHasUnclaimed] = useState(false)

  useEffect(() => {
    setHasUnclaimed(false)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and brand text, matching Header.jsx */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex items-center justify-center rounded-2xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
                <img
                  src="https://necessary-laughter-8861a20860.media.strapiapp.com/logo_8d6d41ebb3.png"
                  alt="4Task Logo"
                  className="h-8 w-8 lg:h-12 lg:w-12 object-contain relative z-10"
                  style={{
                    minWidth: "2rem",
                    minHeight: "2rem",
                    filter: 'brightness(1.1) contrast(1.1)',
                  }}
                />
                {/* Sparkle effects */}
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
            </div>
            {/* Brand text with enhanced typography */}
            <div className="flex flex-col">
              <h1
                className="text-xl lg:text-2xl font-black bg-clip-text text-white tracking-tight leading-none transition-all duration-500"
                
              >
                4Task
              </h1>
              <span
                className="text-xs lg:text-sm font-medium transition-colors duration-300 tracking-wide"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Task Manager
              </span>
            </div>
          </Link>
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <WifiStatus />
            <button
              className="p-2 rounded-lg text-gray-400 cursor-pointer hover:text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => window.location.href = '/Profile'}
              title="Go to Profile"
            >
              <User className="h-5 w-5" />
            </button>
            {/* Uncomment if you want the achievements button */}
            {/* <button
              className="relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              title="View Achievements"
              onClick={() => navigate("/achievement")}
            >
              <Trophy className="h-6 w-6 text-yellow-400" />
              {hasUnclaimed && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">!</span>
              )}
            </button> */}
          </div>
        </div>
      </div>
    </header>
  )
} 