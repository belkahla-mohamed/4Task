"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Filter, Target, Cloud, Plus, Layers } from "lucide-react"
import { useEffect, useState } from "react"

export default function HowItWorks() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  // Removed dark mode support

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Removed dark mode observer

  const steps = [
    {
      number: "01",
      title: t("createYourTasks"),
      description: t("createTasksDesc"),
      icon: <Plus className="h-8 w-8" />,
      delay: "delay-100",
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
      number: "02",
      title: t("organizeFilter"),
      description: t("organizeFilterDesc"),
      icon: <Filter className="h-8 w-8" />,
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
      number: "03",
      title: t("trackProgress"),
      description: t("trackProgressDesc"),
      icon: <Target className="h-8 w-8" />,
      delay: "delay-300",
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
      number: "04",
      title: t("staySynced"),
      description: t("staySyncedDesc"),
      icon: <Cloud className="h-8 w-8" />,
      delay: "delay-400",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-purple-500",
        primaryHover: "group-hover:bg-purple-600",
        text: "text-purple-500",
        textHover: "group-hover:text-purple-600",
        bg: "bg-purple-50",
        bgDark: "bg-purple-500/10",
        border: "border-purple-200",
        shadow: "group-hover:shadow-purple-500/20",
        glow: "from-purple-500/10 to-purple-500/5",
        accent: "from-purple-500 via-purple-400 to-purple-600",
        particle: "bg-purple-400/30",
      },
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden relative"
    >
      {/* Background decorative elements with step colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(var(--color-accent-rgb, 16,185,129), 0.05)' }} />
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl animate-bounce"
          style={{ background: 'rgba(var(--color-primary-rgb, 59,130,246), 0.05)', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full blur-2xl animate-pulse"
          style={{ background: 'rgba(var(--color-destructive-rgb, 251,191,36), 0.05)', animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-20 h-20 rounded-full blur-xl animate-ping"
          style={{ background: 'rgba(var(--color-secondary-rgb, 139,92,246), 0.05)', animationDelay: '3s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with fly-in animation */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-gradient-to-r from-emerald-500/10 via-blue-500/10 via-amber-500/10 to-purple-500/10 text-foreground border-border/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <Layers className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("howItWorks")}
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("howItWorksDescription")}
          </p>
        </div>

        {/* Steps grid with color-coded animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative group cursor-pointer transition-all duration-700 ease-out rounded-3xl
                hover:scale-105 hover:-translate-y-2
                ${isVisible ? `opacity-100 translate-x-0 translate-y-0 ${step.delay}` : `opacity-0 ${step.direction}`}
                ${isRTL ? "text-right" : "text-left"} md:text-center
              `}
              style={{
                background: '#fff',
                color: undefined,
                transitionDelay: isVisible ? step.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Card background with step-specific colors */}
              <div
                className={`absolute inset-0 ${step.colors.bgDark} backdrop-blur-sm rounded-3xl ${step.colors.border} border opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl group-hover:shadow-2xl ${step.colors.shadow}`}
              />
              {/* Floating particles with step colors */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 ${step.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`absolute bottom-4 left-4 w-1 h-1 ${step.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10 p-6">
                {/* Icon container with step-specific colors */}
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 ${step.colors.primary} ${step.colors.primaryHover} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl backdrop-blur-sm`}
                  >
                    {step.icon}
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto bg-gradient-to-br ${step.colors.accent} text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 border-2 border-background`}
                  >
                    {step.number}
                  </div>
                  {/* Connecting line with step color */}
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent transform translate-x-4 ${step.colors.textHover} transition-colors duration-500`}
                    />
                  )}
                </div>
                {/* Content with step-specific hover colors */}
                <div className="space-y-4">
                  <h3
                    className={`text-xl font-bold text-foreground ${step.colors.textHover} transition-colors duration-300 group-hover:scale-105 transform origin-center`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed"
                  >
                    {step.description}
                  </p>
                </div>

                {/* Animated bottom accent with step colors */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${step.colors.accent} group-hover:w-3/4 transition-all duration-500 rounded-full`}
                />
              </div>

              {/* Glow effect with step colors */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />
            </div>
          ))}
        </div>

        {/* Process flow visualization with color progression */}
        <div className="hidden lg:block mt-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 via-amber-500/20 to-purple-500/20 transform -translate-y-1/2" />
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${step.colors.primary} transition-all duration-700 ${
                  isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? index * 100 + 500 + "ms" : "0ms",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
