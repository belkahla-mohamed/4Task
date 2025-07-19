import { Wifi, WifiOff, CheckCircle, User, Trophy } from "lucide-react"
import { WifiStatus } from "../../components/wifi-status"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function DashboardHeader() {
  const navigate = useNavigate()
  const [hasUnclaimed, setHasUnclaimed] = useState(false)

  useEffect(() => {
    // Optionally, fetch user achievements and check for unclaimed XP
    // For now, just set to false or implement logic as needed
    setHasUnclaimed(false)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">4Task Dashboard</h1>
                <div className="flex items-center space-x-2">
                  {/* isOnline is not defined in this component, so this block is removed */}
                  {/* {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-yellow-500" />
                  )} */}
                  {/* <span className="text-xs text-gray-500 dark:text-gray-400">{isOnline ? "Online" : "Offline"}</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <WifiStatus />
            <button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => window.location.href = '/Profile'}
              title="Go to Profile"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              className="relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              title="View Achievements"
              onClick={() => navigate("/achievement")}
            >
              <Trophy className="h-6 w-6 text-yellow-400" />
              {hasUnclaimed && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">!</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 