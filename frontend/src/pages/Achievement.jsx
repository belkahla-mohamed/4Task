"use client"

import { useState, useEffect } from "react"
import { Trophy, Zap, Award, Star, Target, Crown } from "lucide-react"

export default function Achievements() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchAchievements() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("https://fresh-egg-85913f543b.strapiapp.com/api/achievements?populate=icon")
        const data = await res.json()
        if (!data.data) throw new Error("No achievements found")

        // Map to flat array of achievements
        const achievementsList = data.data.map((item) => {
          const attr = item || {}
          return {
            id: item.id,
            title: attr.title,
            description: attr.description,
            xp: attr.xp,
            iconUrl: attr.icon?.data?.attributes?.url || null,
            createdAt: attr.createdAt,
            updatedAt: attr.updatedAt,
            publishedAt: attr.publishedAt,
            documentId: attr.documentId,
          }
        })
        setAchievements(achievementsList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  // Achievement rarity colors (you can add rarity logic based on XP or other criteria)
  const getRarityStyle = (xp) => {
    if (xp >= 100) return { color: "#F59E0B", glow: "rgba(245, 158, 11, 0.3)", name: "Legendary" }
    if (xp >= 75) return { color: "#A855F7", glow: "rgba(168, 85, 247, 0.3)", name: "Epic" }
    if (xp >= 50) return { color: "#1E90FF", glow: "rgba(30, 144, 255, 0.3)", name: "Rare" }
    if (xp >= 25) return { color: "#4ADE80", glow: "rgba(74, 222, 128, 0.3)", name: "Uncommon" }
    return { color: "#B0B0B0", glow: "rgba(176, 176, 176, 0.3)", name: "Common" }
  }

  const getRandomIcon = () => {
    const icons = [Trophy, Award, Star, Target, Crown, Zap]
    return icons[Math.floor(Math.random() * icons.length)]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-slate-300">Loading achievements...</div>
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .card-floating {
          animation: cardFloat 4s ease-in-out infinite;
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
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
          <div
            className="absolute top-1/2 left-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-20 h-20 bg-cyan-500/10 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "5s" }}
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
          {/* Header */}
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-4">
              <span className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm">
                <Trophy className="h-4 w-4 mr-2" />
                Your Progress
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Achievements
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                & Rewards
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Track your progress and unlock rewards as you complete tasks and reach new milestones
            </p>
          </div>

          {/* Achievements Stats */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 rounded-xl bg-blue-500/20 border border-blue-400/30">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{achievements.length}</div>
                <div className="text-xs sm:text-sm text-slate-300">Total</div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {achievements.reduce((sum, a) => sum + (a.xp || 0), 0)}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">Total XP</div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {achievements.filter((a) => (a.xp || 0) >= 75).length}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">Rare+</div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-slate-600/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 rounded-xl bg-orange-500/20 border border-orange-400/30">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {Math.round(achievements.reduce((sum, a) => sum + (a.xp || 0), 0) / achievements.length || 0)}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">Avg XP</div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div
            className={`transition-all duration-1000 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {achievements.map((achievement, index) => {
                const rarity = getRarityStyle(achievement.xp || 0)
                const IconComponent = getRandomIcon()

                return (
                  <div
                    key={achievement.id}
                    className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-slate-600/30 card-floating fade-in-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      borderColor: `${rarity.color}40`,
                    }}
                  >
                    {/* Rarity indicator */}
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium border backdrop-blur-sm"
                        style={{
                          color: rarity.color,
                          backgroundColor: `${rarity.color}20`,
                          borderColor: `${rarity.color}30`,
                        }}
                      >
                        {rarity.name}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <div
                        className="p-3 sm:p-4 rounded-xl border inline-block transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: `${rarity.color}20`,
                          borderColor: `${rarity.color}30`,
                        }}
                      >
                        {achievement.iconUrl ? (
                          <img
                            src={achievement.iconUrl || "/placeholder.svg"}
                            alt="achievement icon"
                            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                          />
                        ) : (
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: rarity.color }} />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg sm:text-xl text-white leading-tight">{achievement.title}</h3>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{achievement.description}</p>

                      {/* XP Badge */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 rounded-lg bg-orange-500/20 border border-orange-400/30">
                            <Zap className="h-4 w-4 text-orange-400" />
                          </div>
                          <span className="text-sm font-semibold text-orange-400">+{achievement.xp || 0} XP</span>
                        </div>

                        {/* Date */}
                        {achievement.createdAt && (
                          <span className="text-xs text-slate-400">
                            {new Date(achievement.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${rarity.glow} 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Empty state */}
          {achievements.length === 0 && (
            <div
              className={`text-center py-16 transition-all duration-1000 ease-out delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-slate-600/30 max-w-md mx-auto">
                <div className="p-4 rounded-full bg-slate-700/50 inline-block mb-6">
                  <Trophy className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">No Achievements Yet</h3>
                <p className="text-slate-300">
                  Start completing tasks to unlock your first achievements and earn XP rewards!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
