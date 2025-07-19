"use client"

import { useState, useEffect } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-slate-100 text-gray-900 overflow-hidden relative">
      {/* Background decorative elements with light colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-28 h-28 bg-orange-500/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 right-10 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl animate-ping"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-10 w-24 h-24 bg-pink-500/5 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-cyan-500/5 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Animated grid pattern for light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header with fly-in animation */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
            }`}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto">
              Get the latest updates, tips, and exclusive content delivered straight to your inbox.
            </p>
          </div>

          {/* Form with enhanced styling and animations */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative max-w-md mx-auto group">
              {/* Background glow effect for light theme */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Form container */}
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    {/* Input with enhanced styling */}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-300/60 rounded-lg text-gray-900 placeholder:text-gray-500 shadow-sm focus:shadow-md focus:shadow-blue-500/20 transition-all duration-200 focus:border-blue-400/60 focus:bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    {/* Input glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0 relative overflow-hidden group/btn">
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 flex items-center">
                      Subscribe
                      <svg
                        className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Floating particles for light theme */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-1/2 -right-0.5 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
                className={`w-2 h-2 ${dot.color} rounded-full animate-pulse opacity-60`}
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
            <p className="text-gray-500 text-sm">Join thousands of users who stay updated with our latest features</p>
          </div>

          {/* Additional features list */}
          <div
            className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {[
              {
                icon: "📧",
                title: "Weekly Updates",
                description: "Get curated content every week",
                color: "blue",
              },
              {
                icon: "🎯",
                title: "Exclusive Tips",
                description: "Access to premium insights",
                color: "emerald",
              },
              {
                icon: "🚀",
                title: "Early Access",
                description: "Be first to try new features",
                color: "purple",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group/card
                  ${feature.color === "blue" ? "hover:border-blue-300/60" : ""}
                  ${feature.color === "emerald" ? "hover:border-emerald-300/60" : ""}
                  ${feature.color === "purple" ? "hover:border-purple-300/60" : ""}
                `}
              >
                <div className="text-3xl mb-3 group-hover/card:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
