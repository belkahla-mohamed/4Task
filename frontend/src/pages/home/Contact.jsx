"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/translation-provider"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const contactMethods = [
    {
      icon: <Mail className="h-10 w-10" />,
      title: t("emailSupport"),
      description: t("getHelpEmail"),
      action: "support@4task.com",
      delay: "delay-100",
      direction: "translate-y-[100px]",
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
        ring: "ring-blue-500/20",
      },
    },
    {
      icon: <Phone className="h-10 w-10" />,
      title: t("phoneSupport"),
      description: t("callDirectly"),
      action: "+1 (555) 123-4567",
      delay: "delay-200",
      direction: "translate-y-[100px]",
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
        ring: "ring-emerald-500/20",
      },
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      title: t("officeLocation"),
      description: t("visitOffice"),
      action: "San Francisco, CA",
      delay: "delay-300",
      direction: "translate-y-[100px]",
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
        ring: "ring-purple-500/20",
      },
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with fly-in animation */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 text-foreground border-border/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Mail className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("contact")}
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
            {t("contactTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("contactDescription")}</p>
        </div>

        {/* Contact cards with color-coded animations */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className={`
                relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 
                hover:shadow-2xl transition-all duration-700 ease-out
                hover:scale-105 hover:-translate-y-4 group cursor-pointer
                ${method.colors.shadow}
                ${isVisible ? `opacity-100 translate-y-0 ${method.delay}` : `opacity-0 ${method.direction}`}
              `}
              style={{
                transitionDelay: isVisible ? method.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Animated background gradient with method colors */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Floating particles with method colors */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 ${method.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`absolute bottom-6 left-6 w-1 h-1 ${method.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <CardContent className="relative z-10 p-8 text-center">
                {/* Icon with method-specific colors */}
                <div
                  className={`
                    ${method.colors.primary} ${method.colors.primaryHover} text-white mb-6 p-4 rounded-2xl backdrop-blur-sm
                    group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out
                    shadow-lg group-hover:shadow-xl w-fit mx-auto
                  `}
                >
                  {method.icon}
                </div>

                {/* Content with method-specific hover colors */}
                <h3
                  className={`text-xl font-bold text-card-foreground ${method.colors.textHover} transition-colors duration-300 mb-3`}
                >
                  {method.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mb-6">
                  {method.description}
                </p>

                {/* Action button with method colors */}
                <Button
                  variant="outline"
                  className={`
                    border-border bg-transparent shadow-sm hover:shadow-md transition-all duration-300 
                    hover:scale-105 ${method.colors.textHover} hover:border-current
                    group-hover:bg-gradient-to-r ${method.colors.glow}
                  `}
                >
                  {method.action}
                </Button>

                {/* Animated border with method colors */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${method.colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </CardContent>

              {/* Enhanced glow effect */}
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${method.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />

              {/* Pulsing ring effect */}
              <div
                className={`absolute inset-0 rounded-lg ${method.colors.ring} ring-4 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500`}
              />
            </Card>
          ))}
        </div>

        {/* Contact method indicators */}
        <div className="flex justify-center items-center mt-16 space-x-4 rtl:space-x-reverse">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${method.colors.primary} transition-all duration-700 ${
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
