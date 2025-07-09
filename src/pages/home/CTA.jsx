"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { ArrowRight, Download } from "lucide-react"

export default function CTA() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const ctaElements = [
    {
      type: "primary",
      delay: "delay-200",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-emerald-500",
        primaryHover: "hover:bg-emerald-600",
        text: "text-emerald-500",
        textHover: "hover:text-emerald-400",
        shadow: "hover:shadow-emerald-500/25",
        glow: "from-emerald-500/20 to-emerald-500/10",
        accent: "from-emerald-500 via-emerald-400 to-emerald-600",
        particle: "bg-emerald-400/40",
      },
    },
    {
      type: "secondary",
      delay: "delay-300",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-blue-500",
        primaryHover: "hover:bg-blue-600",
        text: "text-blue-500",
        textHover: "hover:text-blue-400",
        shadow: "hover:shadow-blue-500/25",
        glow: "from-blue-500/20 to-blue-500/10",
        accent: "from-blue-500 via-blue-400 to-blue-600",
        particle: "bg-blue-400/40",
      },
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background decorative elements with CTA colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 right-10 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl animate-ping"
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

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Header with fly-in animation */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t("readyToTransform")}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{t("ctaDescription")}</p>
        </div>

        {/* CTA Buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
          {/* Primary CTA Button */}
          <div
            className={`
              relative group transition-all duration-700 ease-out
              hover:scale-105 hover:-translate-y-2
              ${isVisible ? `opacity-100 translate-x-0 ${ctaElements[0].delay}` : `opacity-0 ${ctaElements[0].direction}`}
            `}
            style={{
              transitionDelay: isVisible ? ctaElements[0].delay.replace("delay-", "") + "ms" : "0ms",
            }}
          >
            {/* Button background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${ctaElements[0].colors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Floating particles */}
            <div
              className={`absolute -top-2 -right-2 w-3 h-3 ${ctaElements[0].colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div
              className={`absolute -bottom-2 -left-2 w-2 h-2 ${ctaElements[0].colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <Button
              size="lg"
              className={`relative z-10 bg-gradient-to-r ${ctaElements[0].colors.accent} text-white px-10 py-6 text-lg shadow-2xl ${ctaElements[0].colors.shadow} transition-all duration-300 border-0 backdrop-blur-sm overflow-hidden group/btn`}
              asChild
            >
              <Link to="/dashboard">
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                <span className="relative z-10 flex items-center">
                  {t("startFreeToday")}
                  <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            </Button>

            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-500/20 ring-opacity-0 group-hover:ring-opacity-50 group-hover:scale-110 transition-all duration-500" />
          </div>

          {/* Secondary CTA Button */}
          <div
            className={`
              relative group transition-all duration-700 ease-out
              hover:scale-105 hover:-translate-y-2
              ${isVisible ? `opacity-100 translate-x-0 ${ctaElements[1].delay}` : `opacity-0 ${ctaElements[1].direction}`}
            `}
            style={{
              transitionDelay: isVisible ? ctaElements[1].delay.replace("delay-", "") + "ms" : "0ms",
            }}
          >
            {/* Button background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${ctaElements[1].colors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Floating particles */}
            <div
              className={`absolute -top-2 -right-2 w-3 h-3 ${ctaElements[1].colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div
              className={`absolute -bottom-2 -left-2 w-2 h-2 ${ctaElements[1].colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <Button
              size="lg"
              variant="outline"
              className={`relative z-10 border-2 border-slate-600/50 text-white hover:text-white bg-slate-800/50 hover:bg-slate-700/50 px-10 py-6 text-lg shadow-2xl ${ctaElements[1].colors.shadow} transition-all duration-300 backdrop-blur-sm overflow-hidden group/btn`}
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

              <span className="relative z-10 flex items-center">
                <Download className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 group-hover/btn:-translate-y-1 transition-transform duration-200" />
                {t("downloadApp")}
              </span>
            </Button>

            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/20 ring-opacity-0 group-hover:ring-opacity-50 group-hover:scale-110 transition-all duration-500" />
          </div>
        </div>

        {/* Action indicators */}
        <div
          className={`mt-12 flex justify-center space-x-6 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {ctaElements.map((element, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? index * 150 + 700 + "ms" : "0ms",
              }}
            >
              <div className={`w-4 h-4 rounded-full ${element.colors.primary} shadow-lg`} />
              <div
                className={`absolute inset-0 w-4 h-4 rounded-full ${element.colors.primary} animate-ping opacity-30`}
              />
            </div>
          ))}
        </div>

        {/* Connecting line between buttons */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-emerald-500/20 via-transparent to-blue-500/20" />
      </div>
    </section>
  )
}
