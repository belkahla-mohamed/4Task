"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Star, Users } from "lucide-react"

export default function Testimonials() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  // Removed dark mode support

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Removed dark mode observer

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "4Task has revolutionized how I manage my daily workflow. The offline capability is a game-changer!",
      rating: 5,
      delay: "delay-100",
      direction: "translate-x-[-100px]",
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
        ring: "ring-pink-500/20",
        star: "text-pink-500",
      },
    },
    {
      name: "Ahmed Hassan",
      role: "Software Developer",
      content: "Finally, a task manager that works perfectly offline. The sync feature is seamless and reliable.",
      rating: 5,
      delay: "delay-200",
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
        star: "text-blue-500",
      },
    },
    {
      name: "Maria Garcia",
      role: "Freelance Designer",
      content: "The beautiful interface and dark mode make task management actually enjoyable. Highly recommended!",
      rating: 5,
      delay: "delay-300",
      direction: "translate-x-[100px]",
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
        star: "text-emerald-500",
      },
    },
  ]

  return (
    <section
      id="testimonials"
      className={`py-20 bg-white transition-colors duration-500`}
    >
      <div className="container mx-auto px-4">
        {/* Header with fly-in animation */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-gradient-to-r from-pink-500/10 via-blue-500/10 to-emerald-500/10 text-foreground border-border/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Users className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("reviews")}
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-pink-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {t("testimonialsTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("testimonialsDescription")}
          </p>
        </div>

        {/* Testimonial cards with color-coded animations */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`
                relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 
                hover:shadow-2xl transition-all duration-700 ease-out
                hover:scale-105 hover:-translate-y-4 hover:rotate-1 group cursor-pointer
                ${testimonial.colors.shadow}
                ${
                  isVisible
                    ? `opacity-100 translate-x-0 translate-y-0 ${testimonial.delay}`
                    : `opacity-0 ${testimonial.direction}`
                }
              `}
              style={{
                transitionDelay: isVisible ? testimonial.delay.replace("delay-", "") + "ms" : "0ms",
              }}
            >
              {/* Animated background gradient with testimonial colors */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Floating particles with testimonial colors */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 ${testimonial.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`absolute bottom-6 left-6 w-1 h-1 ${testimonial.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <CardContent className={`relative z-10 p-8 ${isRTL ? "text-right" : "text-left"}`}>
                {/* Star rating with testimonial-specific colors */}
                <div className="flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${testimonial.colors.star} fill-current transition-all duration-200 hover:scale-125`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote content */}
                <div className="relative mb-6">
                  {/* Quote marks with testimonial colors */}
                  <div
                    className={`absolute -top-2 -left-2 text-6xl ${testimonial.colors.text} opacity-20 font-serif leading-none`}
                  >
                    "
                  </div>
                  <p
                    className="text-muted-foreground italic transition-colors duration-300 leading-relaxed text-lg relative z-10"
                    style={{
                      color:
                        hoveredIndex === index
                          ? '#000' // Always light mode for text
                          : undefined,
                      background:
                        hoveredIndex === index && document.documentElement.classList.contains('dark')
                          ? 'var(--color-card)' : undefined,
                      borderRadius: hoveredIndex === index ? '0.5rem' : undefined,
                      padding: hoveredIndex === index ? '0.5rem' : undefined,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {testimonial.content}
                  </p>
                  <div
                    className={`absolute -bottom-4 -right-2 text-6xl ${testimonial.colors.text} opacity-20 font-serif leading-none rotate-180`}
                  >
                    "
                  </div>
                </div>

                {/* Author info with enhanced styling */}
                <div className="relative">
                  <div
                    className={`font-bold text-foreground text-lg ${testimonial.colors.textHover} transition-colors duration-300`}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    {testimonial.role}
                  </div>

                  {/* Author avatar placeholder with testimonial colors */}
                  <div
                    className={`absolute -top-2 -right-2 w-12 h-12 ${testimonial.colors.primary} rounded-full flex items-center justify-center text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                </div>

                {/* Animated border with testimonial colors */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${testimonial.colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </CardContent>

              {/* Enhanced glow effect */}
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${testimonial.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />

              {/* Pulsing ring effect */}
              <div
                className={`absolute inset-0 rounded-lg ${testimonial.colors.ring} ring-4 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500`}
              />
            </Card>
          ))}
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center items-center mt-16 space-x-4 rtl:space-x-reverse">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${testimonial.colors.primary} transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? index * 100 + 800 + "ms" : "0ms",
              }}
            />
          ))}
        </div>

        {/* Overall rating summary */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="flex justify-center items-center space-x-2 text-2xl font-bold text-foreground">
            <Star className="h-8 w-8 text-yellow-500 fill-current" />
            <span>5.0</span>
            <span className="text-muted-foreground text-lg font-normal">from 1,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
