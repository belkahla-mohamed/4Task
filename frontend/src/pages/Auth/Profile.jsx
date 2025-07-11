"use client"

import { useState, useEffect } from "react"
import { User, Trophy, Zap, Flame, Calendar, Target, TrendingUp, Award, Clock, Edit3, Crown } from "lucide-react"
import { jwtDecode } from 'jwt-decode'

// Recent achievements
const recentAchievements = [
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Calendar,
    rarity: "uncommon",
    unlockedAt: "2024-01-10",
    xpReward: 75,
  },
  {
    id: "task_master_10",
    name: "Task Master",
    description: "Complete 10 tasks",
    icon: Trophy,
    rarity: "uncommon",
    unlockedAt: "2024-01-08",
    xpReward: 50,
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Complete a task before 8 AM",
    icon: Clock,
    rarity: "uncommon",
    unlockedAt: "2024-01-05",
    xpReward: 30,
  },
]

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
    <div
      className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: "#1E1E1E",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20`, color }}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-sm" style={{ color: "#4ADE80" }}>
            <TrendingUp className="h-4 w-4" />
            <span>+{trend}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: "#E0E0E0" }}>
        {value}
      </div>
      <div className="text-sm" style={{ color: "#B0B0B0" }}>
        {title}
      </div>
      {subtitle && (
        <div className="text-xs mt-1" style={{ color: "#B0B0B0" }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

// Achievement Badge Component
const AchievementBadge = ({ achievement }) => {
  const rarity = rarityStyles[achievement.rarity]

  return (
    <div
      className="flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: "#1E1E1E",
        borderColor: rarity.color,
      }}
    >
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${rarity.color}20`, color: rarity.color }}>
        <achievement.icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm" style={{ color: "#E0E0E0" }}>
          {achievement.name}
        </h4>
        <p className="text-xs" style={{ color: "#B0B0B0" }}>
          {new Date(achievement.unlockedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="text-xs font-medium" style={{ color: "#FFA500" }}>
        +{achievement.xpReward} XP
      </div>
    </div>
  )
}

// Weekly Chart Component
const WeeklyChart = ({ data }) => {
  const maxTasks = Math.max(...data.map((d) => d.tasks))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: "#E0E0E0" }}>
        Weekly Activity
      </h3>
      <div className="flex items-end justify-between space-x-2 h-32">
        {data.map((day, index) => (
          <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
            <div
              className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 relative group"
              style={{
                height: `${(day.tasks / maxTasks) * 100}%`,
                backgroundColor: "#1E90FF",
                minHeight: "8px",
              }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {day.tasks} tasks, {day.xp} XP
              </div>
            </div>
            <span className="text-xs" style={{ color: "#B0B0B0" }}>
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Profile Component
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('Not authenticated')
      setLoading(false)
      return
    }
    let decoded
    try {
      decoded = jwtDecode(token)
    } catch {
      setError('Invalid token')
      setLoading(false)
      return
    }
    const userId = decoded?.id || decoded?.sub
    if (!userId) {
      setError('Invalid user ID')
      setLoading(false)
      return
    }
    fetch(`https://fresh-egg-85913f543b.strapiapp.com/api/users/${userId}`, {
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
        setError('Failed to fetch user')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">Loading profile...</div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>
  }
  if (!userInfo) {
    return null
  }

  // Only calculate levelInfo if totalXP exists
  const levelInfo = userInfo.totalXP !== undefined ? getLevelInfo(userInfo.totalXP) : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full border-4 flex items-center justify-center"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#1E90FF",
              }}
            >
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12" style={{ color: "#1E90FF" }} />
              )}
            </div>

            {/* Level badge */}
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "#FFA500",
                borderColor: "#121212",
                color: "#FFFFFF",
              }}
            >
              {levelInfo?.level}
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{ color: "#E0E0E0" }}>
            {userInfo.name}
          </h1>
          <p className="mb-4" style={{ color: "#B0B0B0" }}>
            {userInfo.email}
          </p>

          {/* Level Progress */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: "#B0B0B0" }}>
                Level {levelInfo?.level}
              </span>
              <span className="text-sm" style={{ color: "#B0B0B0" }}>
                {levelInfo?.progressXP}/{levelInfo?.neededXP} XP
              </span>
            </div>
            <div className="w-full h-3 rounded-full" style={{ backgroundColor: "#404040" }}>
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${levelInfo?.percentage}%`,
                  backgroundColor: "#1E90FF",
                }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 mx-auto px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "#1E90FF",
              color: "#FFFFFF",
            }}
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          {userInfo.dailyStreak !== undefined && userInfo.longestStreak !== undefined && (
            <StatCard
              icon={Flame}
              title="Current Streak"
              value={`${userInfo.dailyStreak} days`}
              subtitle={`Best: ${userInfo.longestStreak} days`}
              color="#FF6B6B"
            />
          )}
          {userInfo.totalXP !== undefined && levelInfo && (
            <StatCard
              icon={Zap}
              title="Total XP"
              value={userInfo.totalXP.toLocaleString()}
              subtitle={`Level ${levelInfo.level}`}
              color="#1E90FF"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "#1E1E1E",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <WeeklyChart data={weeklyActivity} />
          </div>

          {/* Recent Achievements */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "#1E1E1E",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#E0E0E0" }}>
                Recent Achievements
              </h3>
              <Award className="h-5 w-5" style={{ color: "#FFA500" }} />
            </div>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "#1E1E1E",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#E0E0E0" }}>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: "#B0B0B0" }}>Tasks this week</span>
                <span className="font-semibold" style={{ color: "#E0E0E0" }}>
                  {userInfo.tasksThisWeek}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "#B0B0B0" }}>Tasks this month</span>
                <span className="font-semibold" style={{ color: "#E0E0E0" }}>
                  {userInfo.tasksThisMonth}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "#B0B0B0" }}>Average per day</span>
                <span className="font-semibold" style={{ color: "#E0E0E0" }}>
                  {userInfo.averageTasksPerDay}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "#B0B0B0" }}>Favorite category</span>
                <span className="font-semibold" style={{ color: "#E0E0E0" }}>
                  {userInfo.favoriteCategory}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "#B0B0B0" }}>Member since</span>
                <span className="font-semibold" style={{ color: "#E0E0E0" }}>
                  {new Date(userInfo.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Level Progression */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "#1E1E1E",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#E0E0E0" }}>
              Level Progression
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8" style={{ color: "#FFA500" }} />
                <div>
                  <div className="font-semibold" style={{ color: "#E0E0E0" }}>
                    Level {levelInfo?.level} - Task Master
                  </div>
                  <div className="text-sm" style={{ color: "#B0B0B0" }}>
                    {levelInfo?.progressXP} / {levelInfo?.neededXP} XP to next level
                  </div>
                </div>
              </div>

              <div className="w-full h-4 rounded-full" style={{ backgroundColor: "#404040" }}>
                <div
                  className="h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{
                    width: `${levelInfo?.percentage}%`,
                    backgroundColor: "#1E90FF",
                  }}
                >
                  {levelInfo?.percentage > 20 && (
                    <span className="text-xs font-bold text-white">{Math.round(levelInfo?.percentage)}%</span>
                  )}
                </div>
              </div>

              <div className="text-sm" style={{ color: "#B0B0B0" }}>
                Next level unlocks: Advanced task templates and priority scheduling
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
