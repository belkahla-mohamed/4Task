"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { WifiOff, Filter, Bell, BarChart3, Palette, FolderSyncIcon as Sync } from "lucide-react"
import { useEffect, useState } from "react"

export default function Features() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: <WifiOff className="h-10 w-10" />,
      title: t("offlineFirstDesign"),
      description: t("offlineFirstDesc"),
      color: "text-primary",
      delay: "delay-100",
      direction: "translate-x-[-100px]",
    },
    {
      icon: <Sync className="h-10 w-10" />,
      title: t("smartSynchronization"),
      description: t("smartSyncDesc"),
      color: "text-accent",
      delay: "delay-200",
      direction: "translate-y-[-100px]",
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: t("beautifulThemes"),
      description: t("beautifulThemesDesc"),
      color: "text-secondary",
      delay: "delay-300",
      direction: "translate-x-[100px]",
    },
    {
      icon: <Filter className="h-10 w-10" />,
      title: t("advancedFiltering"),
      description: t("advancedFilteringDesc"),
      color: "text-primary",
      delay: "delay-400",
      direction: "translate-x-[-100px]",
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: t("smartNotifications"),
      description: t("smartNotificationsDesc"),
      color: "text-accent",
      delay: "delay-500",
      direction: "translate-y-[100px]",
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: t("productivityAnalytics"),
      description: t("productivityAnalyticsDesc"),
      color: "text-secondary",
      delay: "delay-600",
      direction: "translate-x-[100px]",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with fly-in animation */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-primary/10 text-primary border-primary/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("features")}
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            {t("featuresTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("featuresDescription")}</p>
        </div>

        {/* Features grid with staggered fly-in animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`
                relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 
                hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 ease-out
                hover:scale-105 hover:rotate-1 group cursor-pointer
                ${
                  isVisible
                    ? `opacity-100 translate-x-0 translate-y-0 ${feature.delay}`
                    : `opacity-0 ${feature.direction}`
                }
              `}
              style={{
                transitionDelay: isVisible ? feature.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent/30 rounded-full animate-ping" />

              <CardHeader className={`relative z-10 pb-4 ${isRTL ? "text-right" : "text-left"}`}>
                <div
                  className={`
                    ${feature.color} mb-6 p-4 rounded-2xl bg-background/50 backdrop-blur-sm
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out
                    shadow-lg group-hover:shadow-xl w-fit
                  `}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Animated border */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating elements for extra animation */}
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-accent/5 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "4s" }}
        />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-secondary/5 rounded-full blur-xl animate-pulse" />
      </div>
    </section>
  )
}
