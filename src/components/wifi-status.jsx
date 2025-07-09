"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { useTranslation } from "@/components/translation-provider"
import { useTaskStore } from "@/lib/task-store"

export function WifiStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState("idle") // 'idle', 'syncing'
  const { t } = useTranslation()
  const { syncTasks } = useTaskStore()

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSync = async () => {
    if (!isOnline) return

    setSyncStatus("syncing")
    try {
      await syncTasks()
      // Simulate sync delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setSyncStatus("idle")
    }
  }

  return (

      <div className="flex items-center space-x-2 ">
        <button
          onClick={handleSync}
          disabled={!isOnline || syncStatus === 'syncing'}
          className={`p-2 rounded-lg transition-colors ${
            syncStatus === 'syncing' 
              ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100'
          }`}
          title={isOnline ? 'Sync tasks' : 'Offline'}
        >
          {syncStatus === 'syncing' ? (
            <RefreshCw size={18} className="animate-spin text-blue-500" />
          ) : isOnline ? (
            <Wifi size={18} className="text-green-500" />
          ) : (
            <WifiOff size={18} className="text-red-500" />
          )}
        </button>
      </div>
 
  )
}
