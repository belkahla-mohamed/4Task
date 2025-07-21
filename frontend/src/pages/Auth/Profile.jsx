"use client"

import { useState, useEffect } from "react"
import {
  User,
  Trophy,
  Zap,
  Flame,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Clock,
  Edit3,
  Crown,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react"
import { jwtDecode } from "jwt-decode"

// Recent achievements
// const recentAchievements = [
//   {
//     id: "streak_7",
//     name: "Week Warrior",
//     description: "Maintain a 7-day streak",
//     icon: Calendar,
//     rarity: "uncommon",
//     unlockedAt: "2024-01-10",
//     xpReward: 75,
//   },
//   {
//     id: "task_master_10",
//     name: "Task Master",
//     description: "Complete 10 tasks",
//     icon: Trophy,
//     rarity: "uncommon",
//     unlockedAt: "2024-01-08",
//     xpReward: 50,
//   },
//   {
//     id: "early_bird",
//     name: "Early Bird",
//     description: "Complete a task before 8 AM",
//     icon: Clock,
//     rarity: "uncommon",
//     unlockedAt: "2024-01-05",
//     xpReward: 30,
//   },
// ]

// Weekly activity data
const weeklyActivity = [
  { day: "Mon", tasks: 4, xp: 120 },
  { day: "Tue", tasks: 3, xp: 90 },
  { day: "Wed", tasks: 5, xp: 150 },
  { day: "Thu", tasks: 2, xp: 60 },
  { day: "Fri", tasks: 6, xp: 180 },
  { day: "Sat", tasks: 3, xp: 90 },
  { day: "Sun", tasks: 2, xp: 60 },
]

// Rarity colors
const rarityStyles = {
  common: { color: "#B0B0B0", glow: "rgba(176, 176, 176, 0.3)" },
  uncommon: { color: "#4ADE80", glow: "rgba(74, 222, 128, 0.3)" },
  rare: { color: "#1E90FF", glow: "rgba(30, 144, 255, 0.3)" },
  epic: { color: "#A855F7", glow: "rgba(168, 85, 247, 0.3)" },
  legendary: { color: "#F59E0B", glow: "rgba(245, 158, 11, 0.3)" },
}

// Level calculation
const getLevelInfo = (xp) => {
  const level = Math.floor(xp / 200) + 1
  const currentLevelXP = (level - 1) * 200
  const nextLevelXP = level * 200
  const progressXP = xp - currentLevelXP
  const neededXP = nextLevelXP - currentLevelXP
  return {
    level,
    progressXP,
    neededXP,
    percentage: (progressXP / neededXP) * 100,
  }
}

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, subtitle, color = "#1E90FF", trend }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-slate-600/30">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-colors duration-200"
          style={{
            backgroundColor: `${color}20`,
            color,
            borderColor: `${color}30`,
          }}
        >
          <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-emerald-400">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>+{trend}%</span>
          </div>
        )}
      </div>
      <div className="text-lg sm:text-2xl font-bold mb-1 text-white">{value}</div>
      <div className="text-xs sm:text-sm text-slate-300">{title}</div>
      {subtitle && <div className="text-xs mt-1 text-slate-400">{subtitle}</div>}
    </div>
  )
}

// Achievement Badge Component
// const AchievementBadge = ({ achievement }) => {
//   const rarity = rarityStyles[achievement.rarity]
//   return (
//     <div
//       className="flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105 bg-slate-800/50 backdrop-blur-sm"
//       style={{
//         borderColor: rarity.color,
//       }}
//     >
//       <div
//         className="p-2 rounded-lg border"
//         style={{
//           backgroundColor: `${rarity.color}20`,
//           color: rarity.color,
//           borderColor: `${rarity.color}30`,
//         }}
//       >
//         <achievement.icon className="h-5 w-5" />
//       </div>
//       <div className="flex-1">
//         <h4 className="font-semibold text-sm text-white">{achievement.name}</h4>
//         <p className="text-xs text-slate-400">{new Date(achievement.unlockedAt).toLocaleDateString()}</p>
//       </div>
//       <div className="text-xs font-medium text-orange-400">+{achievement.xpReward} XP</div>
//     </div>
//   )
// }

// Weekly Chart Component
const WeeklyChart = ({ data }) => {
  const maxTasks = Math.max(...data.map((d) => d.tasks))
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
      <div className="flex items-end justify-between space-x-2 h-32">
        {data.map((day, index) => (
          <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
            <div
              className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 relative group bg-blue-500"
              style={{
                height: `${(day.tasks / maxTasks) * 100}%`,
                minHeight: "8px",
              }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-white">
                {day.tasks} tasks, {day.xp} XP
              </div>
            </div>
            <span className="text-xs text-slate-400">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Edit Profile Form Component
const EditProfileForm = ({ userInfo, onSave, onCancel }) => {
  const [form, setForm] = useState({
    username: userInfo.username || userInfo.name || "",
    email: userInfo.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid"
    }

    if (form.newPassword && form.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      onSave(form)
    }, 1500)
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-700/95 rounded-3xl p-8 shadow-2xl max-w-md w-full backdrop-blur-sm border border-slate-600/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-200 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm ${
                errors.username ? "border-red-500/50" : "border-slate-600/50"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-400 text-xs mt-2">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm ${
                errors.email ? "border-red-500/50" : "border-slate-600/50"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-4 pr-12 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-4 pr-12 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm ${
                  errors.newPassword ? "border-red-500/50" : "border-slate-600/50"
                }`}
                placeholder="Enter new password (optional)"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-400 text-xs mt-2">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          {form.newPassword && (
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 pr-12 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm ${
                    errors.confirmPassword ? "border-red-500/50" : "border-slate-600/50"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-2">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-slate-600/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main Profile Component
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [userProgress, setUserProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      setError("Not authenticated")
      setLoading(false)
      return
    }

    let decoded
    try {
      decoded = jwtDecode(token)
    } catch {
      setError("Invalid token")
      setLoading(false)
      return
    }

    const userId = decoded?.id || decoded?.sub
    if (!userId) {
      setError("Invalid user ID")
      setLoading(false)
      return
    }

    // Fetch user info
    fetch(`https://necessary-laughter-8861a20860.strapiapp.com/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch user")
        setLoading(false)
      })

    // Fetch user progress
    fetch(`https://necessary-laughter-8861a20860.strapiapp.com/api/user-progresses?filters[user][id][$eq]=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setUserProgress(data.data[0].attributes)
        } else {
          setUserProgress(null)
        }
      })
      .catch(() => setUserProgress(null))
  }, [])

  const handleSaveProfile = (formData) => {
    // Update user info with new data
    setUserInfo((prev) => ({
      ...prev,
      name: formData.username,
      username: formData.username,
      email: formData.email,
    }))
    setIsEditing(false)
    setUpdateSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setUpdateSuccess(false), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-slate-300">Loading profile...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-400">{error}</div>
        </div>
      </div>
    )
  }

  if (!userInfo) {
    return null
  }

  // Only calculate levelInfo if userProgress exists
  const levelInfo = userProgress
    ? getLevelInfo(userProgress.xp)
    : null

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-5px) rotate(1deg);
          }
          66% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .card-floating {
          animation: cardFloat 4s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-20 right-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-bounce"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-28 h-28 bg-orange-500/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-10 right-10 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl animate-ping"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {/* Floating background elements */}
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-purple-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
          {/* Success Message */}
          {updateSuccess && (
            <div className="fixed top-4 right-4 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-xl backdrop-blur-sm z-50 shadow-lg">
              Profile updated successfully!
            </div>
          )}

          {/* Header - Traditional layout for mobile, card for larger screens */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Mobile Header (< 640px) */}
            <div className="sm:hidden text-center mb-6">
              <div className="relative inline-block mb-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-600 border-blue-500 shadow-2xl">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-blue-400" />
                  )}
                </div>
                {/* Level badge */}
                {levelInfo && (
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 border-white text-white shadow-lg">
                    {levelInfo.level}
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold mb-2">{userInfo.name || userInfo.username}</h1>
              <p className="mb-4 text-slate-300 text-base">{userInfo.email}</p>

              {/* Level Progress */}
              {levelInfo && (
                <div className="max-w-sm mx-auto mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-300">Level {levelInfo.level}</span>
                    <span className="text-xs text-slate-300">
                      {levelInfo.progressXP}/{levelInfo.neededXP} XP
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700/50 backdrop-blur-sm">
                    <div
                      className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${levelInfo.percentage}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 mx-auto px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-sm"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* XP, Level, Streak from userProgress */}
            {userProgress && (
              <>
                <StatCard
                  icon={Zap}
                  title="Total XP"
                  value={userProgress.xp}
                  subtitle={levelInfo ? `Level ${levelInfo.level}` : ""}
                  color="#1E90FF"
                />
                <StatCard
                  icon={Crown}
                  title="Level"
                  value={levelInfo ? levelInfo.level : userProgress.level}
                  subtitle="Current Level"
                  color="#F59E0B"
                />
                <StatCard
                  icon={Flame}
                  title="Current Streak"
                  value={userProgress.streak || 0}
                  subtitle="Days in a row"
                  color="#FF6B6B"
                />
              </>
            )}
            {userInfo.tasksCompleted !== undefined && (
              <StatCard
                icon={Trophy}
                title="Tasks Completed"
                value={userInfo.tasksCompleted}
                subtitle="All time"
                color="#FFA500"
                trend={12}
              />
            )}
            {userInfo.productivityScore !== undefined && (
              <StatCard
                icon={Target}
                title="Productivity Score"
                value={`${userInfo.productivityScore}%`}
                subtitle="This month"
                color="#4ADE80"
                trend={5}
              />
            )}
          </div>

          {/* Content Grid */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 transition-all duration-1000 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* User Info Card for larger screens (>= 640px) */}
            <div className="hidden sm:block relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Profile Info</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors duration-200 text-blue-400 hover:text-blue-300 border border-blue-500/30"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-600 border-blue-500 shadow-lg">
                    {userInfo.avatar ? (
                      <img
                        src={userInfo.avatar || "/placeholder.svg"}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-blue-400" />
                    )}
                  </div>
                  {levelInfo && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 border-white text-white shadow-lg">
                      {levelInfo.level}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{userInfo.name || userInfo.username}</h4>
                  <p className="text-slate-300 text-sm">{userInfo.email}</p>
                </div>
              </div>

              {/* Level Progress */}
              {levelInfo && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Level {levelInfo.level}</span>
                    <span className="text-sm text-slate-300">
                      {levelInfo.progressXP}/{levelInfo.neededXP} XP
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-700/50">
                    <div
                      className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${levelInfo.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400">{Math.round(levelInfo.percentage)}% to next level</div>
                </div>
              )}
            </div>

            {/* Rest of the existing cards... */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30 card-floating">
              <WeeklyChart data={weeklyActivity} />
            </div>

            {/* Recent Achievements */}
            {/* <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Recent Achievements</h3>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
              </div>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div> */}

            {/* Quick Stats */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">Quick Stats</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-slate-300">Tasks this week</span>
                  <span className="font-semibold text-sm sm:text-base text-white">{userInfo.tasksThisWeek || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-slate-300">Tasks this month</span>
                  <span className="font-semibold text-sm sm:text-base text-white">{userInfo.tasksThisMonth || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-slate-300">Average per day</span>
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {userInfo.averageTasksPerDay || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-slate-300">Favorite category</span>
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {userInfo.favoriteCategory || "Work"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-slate-300">Member since</span>
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {userInfo.joinDate ? new Date(userInfo.joinDate).toLocaleDateString() : "Recently"}
                  </span>
                </div>
              </div>
            </div>

            {/* Level Progression */}
            {levelInfo && (
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">Level Progression</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">
                        Level {levelInfo.level} - Task Master
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300">
                        {levelInfo.progressXP} / {levelInfo.neededXP} XP to next level
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-3 sm:h-4 rounded-full bg-slate-700/50">
                    <div
                      className="h-3 sm:h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-1 sm:pr-2 bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${levelInfo.percentage}%` }}
                    >
                      {levelInfo.percentage > 20 && (
                        <span className="text-xs font-bold text-white">{Math.round(levelInfo.percentage)}%</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300">
                    Next level unlocks: Advanced task templates and priority scheduling
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <EditProfileForm userInfo={userInfo} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
        )}
      </div>
    </>
  )
}
