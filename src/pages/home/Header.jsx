"use client"

import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { WifiStatus } from "@/components/wifi-status"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle, LogIn, User, X } from "lucide-react"
import { useState, useEffect } from "react"

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
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">4Task</h1>
            </Link>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-6 py-8 space-y-6">
            {/* User Section */}
            {isLoggedIn && user && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name || user.email}</p>
                    <p className="text-sm text-gray-600">Welcome back!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <nav className="space-y-4">
              <Link
                to="/features"
                className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
                onClick={onClose}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
                onClick={onClose}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
                onClick={onClose}
              >
                About
              </Link>
            </nav>

            {/* Controls */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Language</span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Connection</span>
                <WifiStatus />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            {isLoggedIn ? (
              <>
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
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem("authToken", "dummy-token")
    localStorage.setItem("userData", JSON.stringify(userData))
    setIsLoggedIn(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    setUser(null)
  }

  return { isLoggedIn, user, login, logout }
}

export default function Header() {
  const { t } = useTranslation()
  const { isLoggedIn, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-lg border-b border-gray-100" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 lg:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                4Task
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
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
            </nav>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-xl">
                <WifiStatus />
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {user && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="bg-blue-600 p-1.5 rounded-full">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                        {user.name || user.email}
                      </span>
                    </div>
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
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-3" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-3" : ""
                  }`}
                ></span>
              </div>
            </button>
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
