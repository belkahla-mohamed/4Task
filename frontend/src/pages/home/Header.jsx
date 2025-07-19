"use client"

import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { LogIn, User, X } from "lucide-react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

// Modern Button component with animations
const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  }

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-blue-500",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-gray-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-blue-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
  }

  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center space-x-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      )}
    </button>
  )
}

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, isLoggedIn, user, onLogin, onLogout }) => {
  const { t } = useTranslation()

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3 group" onClick={onClose}>
              <div className="relative">
                <div className="flex items-center justify-center p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                  
                  <img
                    src="https://fresh-egg-85913f543b.media.strapiapp.com/logo_4task_a2d3384540.png"
                    alt="4Task Logo"
                    className="h-8 w-8  object-contain relative z-10 drop-shadow-md filter brightness-110"
                    style={{ filter: "drop-shadow(0 1px 4px rgba(255,255,255,0.3))" }}
                  />
                </div>
              </div>
              
            </Link>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 space-y-3 mt-auto">
            {isLoggedIn ? (
              <>
                {user && (
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-3 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 cursor-pointer"
                    style={{ textDecoration: "none" }}
                    onClick={onClose}
                  >
                    <div className="bg-blue-600 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                      {user.name || user.email}
                    </span>
                    <span className="ml-2 text-xs text-blue-600 font-semibold">Profile</span>
                  </Link>
                )}
                <Button variant="primary" size="lg" className="w-full">
                  <Link to="/dashboard" className="w-full" onClick={onClose}>
                    {t("getStarted")}
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full" onClick={onLogout}>
                  {t("logout") || "Logout"}
                </Button>
              </>
            ) : (
              <Button variant="primary" size="lg" className="w-full" onClick={onLogin}>
                <LogIn className="h-4 w-4" />
                <span>{t("login") || "Login"}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom hook for authentication
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      setIsLoggedIn(false)
      setUser(null)
      return
    }

    setIsLoggedIn(true)
    // Decode JWT to get user id using jwt-decode
    let decoded
    try {
      decoded = jwtDecode(token)
    } catch {
      setUser(null)
      return
    }

    const userId = decoded?.id || decoded?.sub
    if (!userId) {
      setUser(null)
      return
    }

    // Fetch user from Strapi
    fetch(`https://fresh-egg-85913f543b.strapiapp.com/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
      })
      .catch(() => setUser(null))
  }, [])

  const login = () => {
    // No-op, handled by Login page
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    setUser(null)
  }

  return { isLoggedIn, user, login, logout }
}

// Dark mode toggle function
const toggleDarkMode = () => {
  const html = document.documentElement
  html.classList.toggle("dark")
}

export default function Header() {
  const { t } = useTranslation()
  const { isLoggedIn, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // Removed dark mode support
  // Removed dark mode observer

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    window.location.href = "/login"
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Removed dark mode toggle

  return (
    <>
      <header
        style={{
          background: '#fff',
          color: '#222',
          borderBottom: isScrolled ? '1px solid #e5e7eb' : undefined,
          boxShadow: isScrolled ? '0 2px 8px 0 rgba(0,0,0,0.06)' : '0 1px 2px 0 rgba(0,0,0,0.03)',
          transition: 'all 0.3s',
        }}
        className={`fixed top-0 left-0 right-0 z-40`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Logo container with enhanced styling */}
                <div className="flex items-center justify-center rounded-2xl  group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">

                  {/* Logo image */}
                  <img
                    src="https://fresh-egg-85913f543b.media.strapiapp.com/logo_4task_a2d3384540.png"
                    alt="4Task Logo"
                    className="h-8 w-8 lg:h-12 lg:w-12 object-contain relative z-10 "
                    style={{
                      minWidth: "2rem",
                      minHeight: "2rem",
                     filter: 'brightness(1.1) contrast(1.1)',
                    }}
                  />

                  {/* Sparkle effects */}
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
              </div>

              {/* Brand text with enhanced typography */}
              <div className="flex flex-col">
                <h1
                  className="text-xl lg:text-2xl font-black bg-clip-text text-transparent tracking-tight leading-none transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-foreground), var(--color-foreground), var(--color-foreground))',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  4Task
                </h1>
                <span
                  className="text-xs lg:text-sm font-medium transition-colors duration-300 tracking-wide"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  Task Manager
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/features"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav> */}

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {user && (
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 cursor-pointer"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="bg-blue-600 p-1.5 rounded-full">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                        {user.name || user.email}
                      </span>
                      <span className="ml-2 text-xs text-blue-600 font-semibold">Profile</span>
                    </Link>
                  )}
                  <Button variant="primary" size="md">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <span>{t("getStarted")}</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="md" onClick={handleLogout}>
                    {t("logout") || "Logout"}
                  </Button>
                </div>
              ) : (
                <Button variant="primary" size="md" onClick={handleLogin}>
                  <LogIn className="h-4 w-4" />
                  <span>{t("login") || "Login"}</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-3" : ""
                    }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-3" : ""
                    }`}
                ></span>
              </div>
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  )
}
