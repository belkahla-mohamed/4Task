"use client"

import { useState } from "react"
import {
  Trophy,
  Star,
  Target,
  Zap,
  Calendar,
  CheckCircle,
  Award,
  Crown,
  Flame,
  Clock,
  BookOpen,
  Coffee,
  Briefcase,
  Heart,
  Lock,
  Unlock,
} from "lucide-react"

// Achievement definitions
const achievementCategories = {
  productivity: {
    name: "Productivity",
    icon: Target,
    color: "#1E90FF",
    achievements: [
      {
        id: "first_task",
        name: "Getting Started",
        description: "Complete your first task",
        icon: CheckCircle,
        xpReward: 10,
        requirement: 1,
        type: "tasks_completed",
        rarity: "common",
      },
      {
        id: "task_master_10",
        name: "Task Master",
        description: "Complete 10 tasks",
        icon: Trophy,
        xpReward: 50,
        requirement: 10,
        type: "tasks_completed",
        rarity: "uncommon",
      },
      {
        id: "task_legend_50",
        name: "Task Legend",
        description: "Complete 50 tasks",
        icon: Crown,
        xpReward: 200,
        requirement: 50,
        type: "tasks_completed",
        rarity: "rare",
      },
      {
        id: "century_club",
        name: "Century Club",
        description: "Complete 100 tasks",
        icon: Award,
        xpReward: 500,
        requirement: 100,
        type: "tasks_completed",
        rarity: "epic",
      },
    ],
  },
  streaks: {
    name: "Streaks",
    icon: Flame,
    color: "#FFA500",
    achievements: [
      {
        id: "streak_3",
        name: "On Fire",
        description: "Maintain a 3-day streak",
        icon: Flame,
        xpReward: 25,
        requirement: 3,
        type: "daily_streak",
        rarity: "common",
      },
      {
        id: "streak_7",
        name: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: Calendar,
        xpReward: 75,
        requirement: 7,
        type: "daily_streak",
        rarity: "uncommon",
      },
      {
        id: "streak_30",
        name: "Monthly Master",
        description: "Maintain a 30-day streak",
        icon: Star,
        xpReward: 300,
        requirement: 30,
        type: "daily_streak",
        rarity: "rare",
      },
      {
        id: "streak_100",
        name: "Unstoppable",
        description: "Maintain a 100-day streak",
        icon: Crown,
        xpReward: 1000,
        requirement: 100,
        type: "daily_streak",
        rarity: "legendary",
      },
    ],
  },
  categories: {
    name: "Categories",
    icon: BookOpen,
    color: "#4ADE80",
    achievements: [
      {
        id: "work_focused",
        name: "Work Focused",
        description: "Complete 20 work tasks",
        icon: Briefcase,
        xpReward: 100,
        requirement: 20,
        type: "category_work",
        rarity: "uncommon",
      },
      {
        id: "study_buddy",
        name: "Study Buddy",
        description: "Complete 15 study tasks",
        icon: BookOpen,
        xpReward: 75,
        requirement: 15,
        type: "category_study",
        rarity: "uncommon",
      },
      {
        id: "self_care",
        name: "Self Care Champion",
        description: "Complete 10 personal tasks",
        icon: Heart,
        xpReward: 50,
        requirement: 10,
        type: "category_personal",
        rarity: "common",
      },
    ],
  },
  special: {
    name: "Special",
    icon: Star,
    color: "#FF6B6B",
    achievements: [
      {
        id: "early_bird",
        name: "Early Bird",
        description: "Complete a task before 8 AM",
        icon: Coffee,
        xpReward: 30,
        requirement: 1,
        type: "early_completion",
        rarity: "uncommon",
      },
      {
        id: "night_owl",
        name: "Night Owl",
        description: "Complete a task after 10 PM",
        icon: Clock,
        xpReward: 30,
        requirement: 1,
        type: "late_completion",
        rarity: "uncommon",
      },
      {
        id: "perfectionist",
        name: "Perfectionist",
        description: "Complete all tasks in a day",
        icon: Target,
        xpReward: 100,
        requirement: 1,
        type: "perfect_day",
        rarity: "rare",
      },
    ],
  },
}

// Rarity colors and styles
const rarityStyles = {
  common: { color: "#B0B0B0", glow: "rgba(176, 176, 176, 0.3)" },
  uncommon: { color: "#4ADE80", glow: "rgba(74, 222, 128, 0.3)" },
  rare: { color: "#1E90FF", glow: "rgba(30, 144, 255, 0.3)" },
  epic: { color: "#A855F7", glow: "rgba(168, 85, 247, 0.3)" },
  legendary: { color: "#F59E0B", glow: "rgba(245, 158, 11, 0.3)" },
}

// Achievement Card Component
const AchievementCard = ({ achievement, isUnlocked, progress, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const rarity = rarityStyles[achievement.rarity]

  const progressPercentage = Math.min((progress / achievement.requirement) * 100, 100)

  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isUnlocked ? "hover:shadow-2xl" : "opacity-60"
      }`}
      style={{
        backgroundColor: "#1E1E1E",
        borderColor: isUnlocked ? rarity.color : "#404040",
        boxShadow: isUnlocked && isHovered ? `0 0 30px ${rarity.glow}` : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(achievement)}
    >
      {/* Rarity indicator */}
      <div
        className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase"
        style={{
          backgroundColor: `${rarity.color}20`,
          color: rarity.color,
        }}
      >
        {achievement.rarity}
      </div>

      {/* Lock/Unlock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <Lock className="h-8 w-8" style={{ color: "#B0B0B0" }} />
        </div>
      )}

      {/* Achievement content */}
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-xl transition-all duration-300 ${isHovered && isUnlocked ? "scale-110" : ""}`}
          style={{
            backgroundColor: `${rarity.color}20`,
            color: rarity.color,
          }}
        >
          <achievement.icon className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1" style={{ color: "#E0E0E0" }}>
            {achievement.name}
          </h3>
          <p className="text-sm mb-3" style={{ color: "#B0B0B0" }}>
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: "#B0B0B0" }}>
              <span>Progress</span>
              <span>
                {Math.min(progress, achievement.requirement)}/{achievement.requirement}
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#404040" }}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: rarity.color,
                }}
              />
            </div>
          </div>

          {/* XP reward */}
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" style={{ color: "#FFA500" }} />
            <span className="text-sm font-medium" style={{ color: "#FFA500" }}>
              +{achievement.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Unlock animation */}
      {isUnlocked && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 animate-ping">
            <Star className="h-4 w-4" style={{ color: rarity.color }} />
          </div>
          <div className="absolute bottom-2 right-2 animate-pulse">
            <Unlock className="h-4 w-4" style={{ color: rarity.color }} />
          </div>
        </div>
      )}
    </div>
  )
}

// Achievement Detail Modal
const AchievementModal = ({ achievement, isOpen, onClose, isUnlocked, progress }) => {
  if (!isOpen || !achievement) return null

  const rarity = rarityStyles[achievement.rarity]
  const progressPercentage = Math.min((progress / achievement.requirement) * 100, 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-lg mx-4 p-8 rounded-3xl shadow-2xl border-2 transform animate-modal-in"
        style={{
          backgroundColor: "#1E1E1E",
          borderColor: rarity.color,
          boxShadow: `0 0 50px ${rarity.glow}`,
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="inline-flex p-4 rounded-2xl mb-4"
            style={{
              backgroundColor: `${rarity.color}20`,
              color: rarity.color,
            }}
          >
            <achievement.icon className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#E0E0E0" }}>
            {achievement.name}
          </h2>
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-bold uppercase"
            style={{
              backgroundColor: `${rarity.color}20`,
              color: rarity.color,
            }}
          >
            {achievement.rarity}
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-lg mb-6" style={{ color: "#B0B0B0" }}>
          {achievement.description}
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2" style={{ color: "#B0B0B0" }}>
            <span>Progress</span>
            <span>
              {Math.min(progress, achievement.requirement)}/{achievement.requirement}
            </span>
          </div>
          <div className="w-full h-3 rounded-full" style={{ backgroundColor: "#404040" }}>
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: rarity.color,
              }}
            />
          </div>
        </div>

        {/* Reward */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="h-6 w-6" style={{ color: "#FFA500" }} />
            <span className="text-xl font-bold" style={{ color: "#FFA500" }}>
              +{achievement.xpReward} XP Reward
            </span>
          </div>
          {isUnlocked && (
            <div className="flex items-center justify-center space-x-2" style={{ color: "#4ADE80" }}>
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Achievement Unlocked!</span>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: rarity.color,
            color: "#FFFFFF",
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

// Main Achievements Component
export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("productivity")

  // Mock user progress data
  const userProgress = {
    tasks_completed: 25,
    daily_streak: 12,
    category_work: 8,
    category_study: 5,
    category_personal: 12,
    early_completion: 3,
    late_completion: 1,
    perfect_day: 0,
  }

  // Mock unlocked achievements
  const unlockedAchievements = new Set([
    "first_task",
    "task_master_10",
    "streak_3",
    "streak_7",
    "self_care",
    "early_bird",
  ])

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement)
    setIsModalOpen(true)
  }

  const getTotalXP = () => {
    let totalXP = 0
    Object.values(achievementCategories).forEach((category) => {
      category.achievements.forEach((achievement) => {
        if (unlockedAchievements.has(achievement.id)) {
          totalXP += achievement.xpReward
        }
      })
    })
    return totalXP
  }

  const getUnlockedCount = () => {
    let total = 0
    Object.values(achievementCategories).forEach((category) => {
      total += category.achievements.length
    })
    return { unlocked: unlockedAchievements.size, total }
  }

  const stats = getUnlockedCount()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: "#1E90FF" }}>
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "#E0E0E0" }}>
              Achievements
            </h1>
          </div>
          <p className="text-lg mb-6" style={{ color: "#B0B0B0" }}>
            Track your progress and unlock rewards as you complete tasks
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: "#FFA500" }} />
              <div className="text-2xl font-bold" style={{ color: "#E0E0E0" }}>
                {stats.unlocked}/{stats.total}
              </div>
              <div className="text-sm" style={{ color: "#B0B0B0" }}>
                Achievements Unlocked
              </div>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Zap className="h-8 w-8 mx-auto mb-2" style={{ color: "#1E90FF" }} />
              <div className="text-2xl font-bold" style={{ color: "#E0E0E0" }}>
                {getTotalXP()}
              </div>
              <div className="text-sm" style={{ color: "#B0B0B0" }}>
                Total XP Earned
              </div>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Flame className="h-8 w-8 mx-auto mb-2" style={{ color: "#FF6B6B" }} />
              <div className="text-2xl font-bold" style={{ color: "#E0E0E0" }}>
                {userProgress.daily_streak}
              </div>
              <div className="text-sm" style={{ color: "#B0B0B0" }}>
                Current Streak
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(achievementCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                activeCategory === key ? "shadow-lg" : ""
              }`}
              style={{
                backgroundColor: activeCategory === key ? category.color : "#1E1E1E",
                color: activeCategory === key ? "#FFFFFF" : "#B0B0B0",
                border: `2px solid ${activeCategory === key ? category.color : "rgba(255, 255, 255, 0.1)"}`,
              }}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementCategories[activeCategory].achievements.map((achievement, index) => (
            <div key={achievement.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <AchievementCard
                achievement={achievement}
                isUnlocked={unlockedAchievements.has(achievement.id)}
                progress={userProgress[achievement.type] || 0}
                onClick={handleAchievementClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isUnlocked={selectedAchievement && unlockedAchievements.has(selectedAchievement.id)}
        progress={selectedAchievement ? userProgress[selectedAchievement.type] || 0 : 0}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
