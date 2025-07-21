"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { MessageCircle, Bot, Sparkles, Zap } from "lucide-react"

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

      {/* Floating AI elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Bot className="w-8 h-8 text-emerald-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: "1s" }}>
          <MessageCircle className="w-6 h-6 text-blue-400/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-7 h-7 text-purple-400/30" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-float" style={{ animationDelay: "3s" }}>
          <Zap className="w-5 h-5 text-orange-400/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Header with fly-in animation */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Meet Your AI Assistant
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the power of intelligent conversation. Our AI chatbot is ready to help you 24/7 with instant
            answers, smart suggestions, and personalized assistance for all your needs.
          </p>
        </div>

        {/* AI Features showcase */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">Instant Responses</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Smart AI Technology</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-slate-300">Personalized Help</span>
            </div>
          </div>
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
                  <MessageCircle className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 group-hover/btn:scale-110 transition-transform duration-200" />
                  Try AI Chat Now
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
                <Bot className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-200" />
                Learn More About AI
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

        {/* AI Chat Preview */}
        <div
          className={`mt-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">AI Assistant</p>
                <p className="text-xs text-slate-400">Online now</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-3 text-left">
                <p className="text-sm text-slate-300">👋 Hi! I'm your AI assistant. How can I help you today?</p>
              </div>
              <div className="bg-emerald-500/20 rounded-lg p-3 text-right ml-8">
                <p className="text-sm text-white">Tell me about your features</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-left">
                <p className="text-sm text-slate-300">
                  I can help with tasks, answer questions, provide suggestions, and much more! ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting line between buttons */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-emerald-500/20 via-transparent to-blue-500/20" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
