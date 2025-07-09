"use client"

import { useTranslation } from "@/components/translation-provider"
import { useEffect, useState } from "react"

export default function Stats() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      value: "10K+",
      label: t("activeUsers"),
      delay: "delay-100",
      direction: "translate-y-[100px]",
      colors: {
        primary: "bg-blue-500",
        primaryHover: "group-hover:bg-blue-600",
        text: "text-blue-500",
        textHover: "group-hover:text-blue-400",
        bg: "bg-blue-50",
        bgDark: "bg-blue-500/10",
        border: "border-blue-200",
        shadow: "group-hover:shadow-blue-500/30",
        glow: "from-blue-500/20 to-blue-500/10",
        accent: "from-blue-500 via-blue-400 to-blue-600",
        particle: "bg-blue-400/40",
        ring: "ring-blue-500/20",
      },
    },
    {
      value: "1M+",
      label: t("tasksCompleted"),
      delay: "delay-200",
      direction: "translate-y-[100px]",
      colors: {
        primary: "bg-emerald-500",
        primaryHover: "group-hover:bg-emerald-600",
        text: "text-emerald-500",
        textHover: "group-hover:text-emerald-400",
        bg: "bg-emerald-50",
        bgDark: "bg-emerald-500/10",
        border: "border-emerald-200",
        shadow: "group-hover:shadow-emerald-500/30",
        glow: "from-emerald-500/20 to-emerald-500/10",
        accent: "from-emerald-500 via-emerald-400 to-emerald-600",
        particle: "bg-emerald-400/40",
        ring: "ring-emerald-500/20",
      },
    },
    {
      value: "99.9%",
      label: t("uptime"),
      delay: "delay-300",
      direction: "translate-y-[100px]",
      colors: {
        primary: "bg-orange-500",
        primaryHover: "group-hover:bg-orange-600",
        text: "text-orange-500",
        textHover: "group-hover:text-orange-400",
        bg: "bg-orange-50",
        bgDark: "bg-orange-500/10",
        border: "border-orange-200",
        shadow: "group-hover:shadow-orange-500/30",
        glow: "from-orange-500/20 to-orange-500/10",
        accent: "from-orange-500 via-orange-400 to-orange-600",
        particle: "bg-orange-400/40",
        ring: "ring-orange-500/20",
      },
    },
    {
      value: "24/7",
      label: t("offlineSupport"),
      delay: "delay-400",
      direction: "translate-y-[100px]",
      colors: {
        primary: "bg-purple-500",
        primaryHover: "group-hover:bg-purple-600",
        text: "text-purple-500",
        textHover: "group-hover:text-purple-400",
        bg: "bg-purple-50",
        bgDark: "bg-purple-500/10",
        border: "border-purple-200",
        shadow: "group-hover:shadow-purple-500/30",
        glow: "from-purple-500/20 to-purple-500/10",
        accent: "from-purple-500 via-purple-400 to-purple-600",
        particle: "bg-purple-400/40",
        ring: "ring-purple-500/20",
      },
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background decorative elements with stat colors */}
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                group relative cursor-pointer transition-all duration-700 ease-out
                hover:scale-110 hover:-translate-y-4
                ${isVisible ? `opacity-100 translate-y-0 ${stat.delay}` : `opacity-0 ${stat.direction}`}
              `}
              style={{
                transitionDelay: isVisible ? stat.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Card background with stat-specific colors */}
              <div
                className={`absolute inset-0 ${stat.colors.bgDark} backdrop-blur-sm rounded-3xl border ${stat.colors.border} opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl ${stat.colors.shadow} ${stat.colors.ring} ring-4 ring-opacity-0 group-hover:ring-opacity-100`}
              />

              {/* Floating particles with stat colors */}
              <div
                className={`absolute -top-2 -right-2 w-3 h-3 ${stat.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`absolute -bottom-2 -left-2 w-2 h-2 ${stat.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className={`absolute top-1/2 -right-1 w-1 h-1 ${stat.colors.particle} rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative z-10 p-8">
                {/* Stat value with enhanced styling */}
                <div
                  className={`text-6xl font-bold mb-4 transition-all duration-500 ease-out group-hover:scale-125 ${stat.colors.textHover} bg-gradient-to-br ${stat.colors.accent} bg-clip-text group-hover:text-transparent`}
                >
                  {stat.value}
                </div>

                {/* Stat label */}
                <div className="text-slate-300 group-hover:text-white transition-colors duration-300 text-lg font-medium">
                  {stat.label}
                </div>

                {/* Animated accent line */}
                <div
                  className={`mx-auto mt-4 h-1 w-0 bg-gradient-to-r ${stat.colors.accent} group-hover:w-16 transition-all duration-500 rounded-full`}
                />

                {/* Pulsing ring effect */}
                <div
                  className={`absolute inset-0 rounded-3xl ${stat.colors.ring} ring-2 ring-opacity-0 group-hover:ring-opacity-50 group-hover:scale-110 transition-all duration-500`}
                />
              </div>

              {/* Enhanced glow effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
              />

              {/* Orbiting elements */}
              <div
                className={`absolute top-0 left-1/2 w-1 h-1 ${stat.colors.particle} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300`}
                style={{ transformOrigin: "0 100px" }}
              />
            </div>
          ))}
        </div>

        {/* Stats color indicators */}
        <div className="flex justify-center items-center mt-16 space-x-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? index * 150 + 1000 + "ms" : "0ms",
              }}
            >
              <div className={`w-4 h-4 rounded-full ${stat.colors.primary} shadow-lg`} />
              <div className={`absolute inset-0 w-4 h-4 rounded-full ${stat.colors.primary} animate-ping opacity-30`} />
            </div>
          ))}
        </div>

        {/* Connecting lines between stats */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-y-1/2" />
      </div>
    </section>
  )
}
