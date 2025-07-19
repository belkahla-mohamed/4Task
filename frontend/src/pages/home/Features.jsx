"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { WifiOff, Filter, Bell, BarChart3, Palette, FolderSyncIcon as Sync } from "lucide-react"
import { useEffect, useState } from "react"

export default function Features() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  // Removed dark mode support
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Removed dark mode observer

  const features = [
    {
      icon: <WifiOff className="h-10 w-10" />,
      title: t("offlineFirstDesign"),
      description: t("offlineFirstDesc"),
      delay: "delay-100",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-red-500",
        primaryHover: "group-hover:bg-red-600",
        text: "text-red-500",
        textHover: "group-hover:text-red-600",
        bg: "bg-red-50",
        bgDark: "bg-red-500/10",
        border: "border-red-200",
        shadow: "group-hover:shadow-red-500/20",
        glow: "from-red-500/10 to-red-500/5",
        accent: "from-red-500 via-red-400 to-red-600",
        particle: "bg-red-400/30",
      },
    },
    {
      icon: <Sync className="h-10 w-10" />,
      title: t("smartSynchronization"),
      description: t("smartSyncDesc"),
      delay: "delay-200",
      direction: "translate-y-[-100px]",
      colors: {
        primary: "bg-blue-500",
        primaryHover: "group-hover:bg-blue-600",
        text: "text-blue-500",
        textHover: "group-hover:text-blue-600",
        bg: "bg-blue-50",
        bgDark: "bg-blue-500/10",
        border: "border-blue-200",
        shadow: "group-hover:shadow-blue-500/20",
        glow: "from-blue-500/10 to-blue-500/5",
        accent: "from-blue-500 via-blue-400 to-blue-600",
        particle: "bg-blue-400/30",
      },
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: t("beautifulThemes"),
      description: t("beautifulThemesDesc"),
      delay: "delay-300",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-pink-500",
        primaryHover: "group-hover:bg-pink-600",
        text: "text-pink-500",
        textHover: "group-hover:text-pink-600",
        bg: "bg-pink-50",
        bgDark: "bg-pink-500/10",
        border: "border-pink-200",
        shadow: "group-hover:shadow-pink-500/20",
        glow: "from-pink-500/10 to-pink-500/5",
        accent: "from-pink-500 via-pink-400 to-pink-600",
        particle: "bg-pink-400/30",
      },
    },
    {
      icon: <Filter className="h-10 w-10" />,
      title: t("advancedFiltering"),
      description: t("advancedFilteringDesc"),
      delay: "delay-400",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-emerald-500",
        primaryHover: "group-hover:bg-emerald-600",
        text: "text-emerald-500",
        textHover: "group-hover:text-emerald-600",
        bg: "bg-emerald-50",
        bgDark: "bg-emerald-500/10",
        border: "border-emerald-200",
        shadow: "group-hover:shadow-emerald-500/20",
        glow: "from-emerald-500/10 to-emerald-500/5",
        accent: "from-emerald-500 via-emerald-400 to-emerald-600",
        particle: "bg-emerald-400/30",
      },
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: t("smartNotifications"),
      description: t("smartNotificationsDesc"),
      delay: "delay-500",
      direction: "translate-y-[100px]",
      colors: {
        primary: "bg-amber-500",
        primaryHover: "group-hover:bg-amber-600",
        text: "text-amber-500",
        textHover: "group-hover:text-amber-600",
        bg: "bg-amber-50",
        bgDark: "bg-amber-500/10",
        border: "border-amber-200",
        shadow: "group-hover:shadow-amber-500/20",
        glow: "from-amber-500/10 to-amber-500/5",
        accent: "from-amber-500 via-amber-400 to-amber-600",
        particle: "bg-amber-400/30",
      },
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: t("productivityAnalytics"),
      description: t("productivityAnalyticsDesc"),
      delay: "delay-600",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-indigo-500",
        primaryHover: "group-hover:bg-indigo-600",
        text: "text-indigo-500",
        textHover: "group-hover:text-indigo-600",
        bg: "bg-indigo-50",
        bgDark: "bg-indigo-500/10",
        border: "border-indigo-200",
        shadow: "group-hover:shadow-indigo-500/20",
        glow: "from-indigo-500/10 to-indigo-500/5",
        accent: "from-indigo-500 via-indigo-400 to-indigo-600",
        particle: "bg-indigo-400/30",
      },
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 overflow-hidden">
      {/* Background decorative elements with feature colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(var(--color-accent-rgb, 239,68,68), 0.05)' }} />
        <div
          className="absolute top-40 right-20 w-28 h-28 rounded-full blur-2xl animate-bounce"
          style={{ background: 'rgba(var(--color-primary-rgb, 59,130,246), 0.05)', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full blur-xl animate-pulse"
          style={{ background: 'rgba(var(--color-secondary-rgb, 236,72,153), 0.05)', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full blur-2xl animate-ping"
          style={{ background: 'rgba(var(--color-accent-rgb, 16,185,129), 0.05)', animationDelay: '3s' }}
        />
        <div
          className="absolute bottom-20 left-10 w-16 h-16 rounded-full blur-xl animate-bounce"
          style={{ background: 'rgba(var(--color-destructive-rgb, 251,191,36), 0.05)', animationDelay: '4s' }}
        />
        <div
          className="absolute bottom-32 right-10 w-12 h-12 rounded-full blur-lg animate-pulse"
          style={{ background: 'rgba(var(--color-primary-rgb, 99,102,241), 0.05)', animationDelay: '5s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with rainbow gradient */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-gradient-to-r from-red-500/10 via-blue-500/10 via-pink-500/10 via-emerald-500/10 via-amber-500/10 to-indigo-500/10 text-foreground border-border/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <BarChart3 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("features")}
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-blue-600 via-pink-600 via-emerald-600 via-amber-600 to-indigo-600 bg-clip-text text-transparent">
            {t("featuresTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("featuresDescription")}</p>
        </div>

        {/* Features grid with color-coded animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`
                relative overflow-hidden backdrop-blur-sm border-border/50 hover:shadow-2xl transition-all duration-700 ease-out
                hover:scale-105 hover:rotate-1 group cursor-pointer
                ${feature.colors.shadow}
                ${
                  isVisible
                    ? `opacity-100 translate-x-0 translate-y-0 ${feature.delay}`
                    : `opacity-0 ${feature.direction}`
                }
              `}
              style={{
                background: '#fff',
                color: '#111827',
                transitionDelay: isVisible ? feature.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Animated background gradient with feature colors */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              {/* Floating particles with feature colors */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 ${feature.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`absolute bottom-6 left-6 w-1 h-1 ${feature.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <CardHeader className={`relative z-10 pb-4 ${isRTL ? "text-right" : "text-left"}`}
                style={{ color: '#111827' }}>
                <div
                  className={`
                    ${feature.colors.primary} ${feature.colors.primaryHover} text-white mb-6 p-4 rounded-2xl backdrop-blur-sm
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out
                    shadow-lg group-hover:shadow-xl w-fit
                  `}
                >
                  {feature.icon}
                </div>
                <CardTitle
                  className={`text-xl font-bold text-card-foreground ${feature.colors.textHover} transition-colors duration-300`}
                  style={{ color: '#111827' }}
                >
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0" style={{ color: '#111827' }}>
                <p
                  className="text-muted-foreground leading-relaxed transition-colors duration-300"
                  style={{
                    color:
                      hoveredIndex === index
                        ? '#fff'
                        : '#111827',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {feature.description}
                </p>

                {/* Animated border with feature colors */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </CardContent>

              {/* Enhanced glow effect */}
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl dark:opacity-20`}
              />
            </Card>
          ))}
        </div>

        {/* Feature color indicators */}
        <div className="flex justify-center items-center mt-16 space-x-4 rtl:space-x-reverse">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${feature.colors.primary} transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? index * 100 + 800 + "ms" : "0ms",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
