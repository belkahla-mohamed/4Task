"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Zap, ArrowRight, Play, Wifi, WifiOff } from "lucide-react"

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

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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

        .shimmer-bg {
          background: linear-gradient(
            45deg,
            #f0f9ff 0%,
            #e0f2fe 25%,
            #bae6fd 50%,
            #7dd3fc 75%,
            #38bdf8 100%
          );
          background-size: 400% 400%;
          animation: shimmer 8s ease-in-out infinite;
        }

        .grid-pattern {
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <section className="relative overflow-hidden shimmer-bg min-h-screen">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        {/* Floating background elements */}
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 floating"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 floating"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000`}
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-600 border border-blue-200 px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Zap className="h-4 w-4 mr-2" />
                  Offline-First Task Management
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Stay Productive
                  <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    Anywhere, Anytime
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Manage your tasks seamlessly with our offline-first approach. Work without interruption, sync when
                  connected.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                >
                  Start Managing Tasks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 px-8 py-4 text-lg bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-200">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Offline Ready</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-200">
                    ⚡
                  </div>
                  <div className="text-sm text-gray-600">Lightning Fast</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-200">
                    🔒
                  </div>
                  <div className="text-sm text-gray-600">Secure</div>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 card-floating">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Today's Tasks</h3>
                    <Badge className="bg-green-100 text-green-600 border border-green-200">3 pending</Badge>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className={`
                          flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200
                          ${taskAnimations[0] && index === 0 ? "task-fly-left" : ""}
                          ${taskAnimations[1] && index === 1 ? "task-fly-right" : ""}
                          ${taskAnimations[2] && index === 2 ? "task-fly-top" : ""}
                          ${!taskAnimations[index] ? "opacity-0" : ""}
                          ${task.status === "completed" ? "opacity-50" : ""}
                        `}
                      >
                        {task.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full animate-pulse"
                            style={{ backgroundColor: task.color }}
                          ></div>
                        )}

                        <span
                          className={`text-gray-800 ${task.status === "completed" ? "line-through text-gray-500" : ""}`}
                        >
                          {task.text}
                        </span>

                        <Badge
                          className={`
                          ml-auto text-xs
                          ${task.priority === "High" ? "bg-red-100 text-red-600 border border-red-200" : ""}
                          ${task.priority === "Medium" ? "bg-blue-100 text-blue-600 border border-blue-200" : ""}
                          ${task.priority === "Done" ? "bg-green-100 text-green-600 border border-green-200" : ""}
                        `}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 floating">
                  <Wifi className="h-6 w-6" />
                </div>

                <div
                  className="absolute -bottom-4 -left-4 bg-gray-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 floating"
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
