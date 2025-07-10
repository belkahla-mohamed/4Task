"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/components/translation-provider"
import { ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background decorative elements with multiple colors */}
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

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header with fly-in animation */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
            }`}
          >
            <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              {t("stayUpdated")}
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-lg mx-auto">{t("newsletterDesc")}</p>
          </div>

          {/* Form with enhanced styling and animations */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative max-w-md mx-auto group">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Form container */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-500">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    {/* Input with enhanced styling */}
                    <Input
                      type="email"
                      placeholder={t("enterEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 shadow-sm focus:shadow-md focus:shadow-blue-500/20 transition-all duration-200 focus:border-blue-400/50 focus:bg-slate-700/70 backdrop-blur-sm"
                    />

                    {/* Input glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-md opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0 relative overflow-hidden group/btn">
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                    <span className="relative z-10 flex items-center">
                      {t("subscribe")}
                      <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Button>
                </div>

                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-emerald-400/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-1/2 -right-0.5 w-0.5 h-0.5 bg-purple-400/40 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>

          {/* Additional decorative elements */}
          <div
            className={`mt-8 flex justify-center space-x-4 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {[
              { color: "bg-blue-500", delay: "0s" },
              { color: "bg-emerald-500", delay: "0.2s" },
              { color: "bg-purple-500", delay: "0.4s" },
            ].map((dot, index) => (
              <div
                key={index}
                className={`w-2 h-2 ${dot.color} rounded-full animate-pulse`}
                style={{ animationDelay: dot.delay }}
              />
            ))}
          </div>

          {/* Success message placeholder with animation */}
          <div
            className={`mt-6 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-slate-400 text-sm">Join thousands of users who stay updated with our latest features</p>
          </div>
        </div>
      </div>
    </section>
  )
}
