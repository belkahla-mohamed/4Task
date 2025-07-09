"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Zap, ArrowRight, Play, Wifi, WifiOff, Shield } from "lucide-react"

// Custom Button component
const Button = ({ children, size, variant = "default", className = "", asChild, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const sizeClasses = {
    lg: "h-11 px-8 text-base",
  }
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }
  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Custom Badge component
const Badge = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [taskAnimations, setTaskAnimations] = useState([false, false, false])

  useEffect(() => {
    setIsVisible(true)
    // Trigger task animations with delays
    const timeouts = [
      setTimeout(() => setTaskAnimations((prev) => [true, prev[1], prev[2]]), 800),
      setTimeout(() => setTaskAnimations((prev) => [prev[0], true, prev[2]]), 1200),
      setTimeout(() => setTaskAnimations((prev) => [prev[0], prev[1], true]), 1600),
    ]
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const tasks = [
    {
      id: 1,
      text: "Review project proposal",
      priority: "High",
      status: "pending",
      color: "#3b82f6",
    },
    {
      id: 2,
      text: "Update documentation",
      priority: "Medium",
      status: "pending",
      color: "#10b981",
    },
    {
      id: 3,
      text: "Team meeting",
      priority: "Done",
      status: "completed",
      color: "#10b981",
    },
  ]

  return (
    <>
      <style jsx>{`
        @keyframes flyInLeft {
          0% {
            transform: translateX(-100vw) rotate(-10deg);
            opacity: 0;
          }
          60% {
            transform: translateX(10px) rotate(2deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes flyInRight {
          0% {
            transform: translateX(100vw) rotate(10deg);
            opacity: 0;
          }
          60% {
            transform: translateX(-10px) rotate(-2deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes flyInTop {
          0% {
            transform: translateY(-100vh) rotate(5deg);
            opacity: 0;
          }
          60% {
            transform: translateY(10px) rotate(-1deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-5px) rotate(1deg);
          }
          66% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        .task-fly-left {
          animation: flyInLeft 1s ease-out forwards;
        }
        .task-fly-right {
          animation: flyInRight 1s ease-out forwards;
        }
        .task-fly-top {
          animation: flyInTop 1s ease-out forwards;
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .card-floating {
          animation: cardFloat 4s ease-in-out infinite;
        }
      `}</style>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
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

        {/* Additional floating background elements */}
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-purple-400/20 rounded-full opacity-30 floating"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000`}
            >
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Offline-First Task Management
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Stay Productive
                  <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Anywhere, Anytime
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Manage your tasks seamlessly with our offline-first approach. Work without interruption, sync when
                  connected.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                >
                  Start Managing Tasks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-slate-600 px-8 py-4 text-lg bg-slate-800/80 backdrop-blur-sm shadow-md text-white hover:text-white hover:bg-slate-700 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                    100%
                  </div>
                  <div className="text-sm text-slate-400">Offline Ready</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full group-hover:from-yellow-400/30 group-hover:to-orange-400/30 group-hover:shadow-lg backdrop-blur-sm border border-yellow-400/20">
                      <Zap className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300 animate-pulse group-hover:animate-bounce" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping"></div>
                  </div>
                  <div className="text-sm text-slate-400 mt-2">Fast</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full group-hover:from-emerald-400/30 group-hover:to-green-400/30 group-hover:shadow-lg backdrop-blur-sm border border-emerald-400/20">
                      <Shield className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 group-hover:animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping"></div>
                  </div>
                  <div className="text-sm text-slate-400 mt-2">Secure</div>
                </div>
              </div>
            </div>
            <div className={`relative ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/10 transition-shadow duration-300 card-floating backdrop-blur-sm border border-slate-600/30">
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-4 border border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">Today's Tasks</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                      3 pending
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className={`
                          flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors duration-200 backdrop-blur-sm border border-slate-600/30
                          ${taskAnimations[0] && index === 0 ? "task-fly-left" : ""}
                          ${taskAnimations[1] && index === 1 ? "task-fly-right" : ""}
                          ${taskAnimations[2] && index === 2 ? "task-fly-top" : ""}
                          ${!taskAnimations[index] ? "opacity-0" : ""}
                        `}
                      >
                        {task.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full animate-pulse"
                            style={{ backgroundColor: task.color }}
                          ></div>
                        )}
                        <span
                          className={`text-white ${task.status === "completed" ? "line-through text-slate-400" : ""}`}
                        >
                          {task.text}
                        </span>
                        <Badge
                          className={`
                          ml-auto text-xs backdrop-blur-sm
                          ${task.priority === "High" ? "bg-red-500/20 text-red-300 border border-red-400/30" : ""}
                          ${task.priority === "Medium" ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" : ""}
                          ${task.priority === "Done" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30" : ""}
                        `}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 floating border border-emerald-400/30">
                  <Wifi className="h-6 w-6" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 bg-slate-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 floating border border-slate-500/30"
                  style={{ animationDelay: "1.5s" }}
                >
                  <WifiOff className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
