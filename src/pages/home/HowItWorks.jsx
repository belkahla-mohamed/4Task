"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Filter, Target, Cloud, Plus, Layers } from "lucide-react"
import { useEffect, useState } from "react"

export default function HowItWorks() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const steps = [
    {
      number: "01",
      title: t("createYourTasks"),
      description: t("createTasksDesc"),
      icon: <Plus className="h-8 w-8" />,
      delay: "delay-100",
      direction: "translate-x-[-100px]",
    },
    {
      number: "02",
      title: t("organizeFilter"),
      description: t("organizeFilterDesc"),
      icon: <Filter className="h-8 w-8" />,
      delay: "delay-200",
      direction: "translate-y-[-100px]",
    },
    {
      number: "03",
      title: t("trackProgress"),
      description: t("trackProgressDesc"),
      icon: <Target className="h-8 w-8" />,
      delay: "delay-300",
      direction: "translate-y-[100px]",
    },
    {
      number: "04",
      title: t("staySynced"),
      description: t("staySyncedDesc"),
      icon: <Cloud className="h-8 w-8" />,
      delay: "delay-400",
      direction: "translate-x-[100px]",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-xl animate-ping"
          style={{ animationDelay: "4s" }}
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
            className={`bg-accent/10 text-accent border-accent/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Layers className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("howItWorks")}
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("howItWorksDescription")}
          </p>
        </div>

        {/* Steps grid with staggered fly-in animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative group cursor-pointer transition-all duration-700 ease-out
                hover:scale-105 hover:-translate-y-2
                ${isVisible ? `opacity-100 translate-x-0 translate-y-0 ${step.delay}` : `opacity-0 ${step.direction}`}
                ${isRTL ? "text-right" : "text-left"} md:text-center
              `}
              style={{
                transitionDelay: isVisible ? step.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Card background with hover effects */}
              <div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/30 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/10" />

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-6">
                {/* Icon container with number badge */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl backdrop-blur-sm">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 border-2 border-background">
                    {step.number}
                  </div>

                  {/* Connecting line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent transform translate-x-4 group-hover:from-primary/50 transition-colors duration-500" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 group-hover:scale-105 transform origin-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Animated bottom accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary group-hover:w-3/4 transition-all duration-500 rounded-full" />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </div>
          ))}
        </div>

        {/* Process flow visualization for larger screens */}
        <div className="hidden lg:block mt-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent transform -translate-y-1/2" />
          <div className="flex justify-between items-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full bg-primary/20 transition-all duration-700 ${
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
