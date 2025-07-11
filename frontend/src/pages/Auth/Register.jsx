"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircle, User, Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Shield, Check, X } from "lucide-react"

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30 animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `linear-gradient(45deg, #1E90FF, #FFA500)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const requirements = [
    { text: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { text: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { text: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { text: "One number", test: (pwd) => /\d/.test(pwd) },
    { text: "One special character", test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ]

  const passedRequirements = requirements.filter((req) => req.test(password)).length
  const strength = (passedRequirements / requirements.length) * 100

  const getStrengthColor = () => {
    if (strength < 40) return "#FF6B6B"
    if (strength < 70) return "#FFA500"
    return "#4ADE80"
  }

  const getStrengthText = () => {
    if (strength < 40) return "Weak"
    if (strength < 70) return "Medium"
    return "Strong"
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "#B0B0B0" }}>
          Password strength:
        </span>
        <span className="text-xs font-medium" style={{ color: getStrengthColor() }}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full rounded-full h-2" style={{ backgroundColor: "#404040" }}>
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${strength}%`,
            backgroundColor: getStrengthColor(),
          }}
        />
      </div>
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            {req.test(password) ? (
              <Check className="h-3 w-3" style={{ color: "#4ADE80" }} />
            ) : (
              <X className="h-3 w-3" style={{ color: "#B0B0B0" }} />
            )}
            <span style={{ color: req.test(password) ? "#4ADE80" : "#B0B0B0" }}>{req.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Custom Input component with animations
const AnimatedInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error = false,
  name,
  required = false,
  showPasswordStrength = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputType = type === "password" && showPassword ? "text" : type

  useEffect(() => {
    setHasValue(value && value.length > 0)
  }, [value])

  return (
    <div className="relative group">
      <div
        className={`relative transition-all duration-500 transform ${
          isFocused ? "scale-105 -translate-y-1" : ""
        } ${error ? "animate-shake" : ""}`}
      >
        {/* Floating label */}
        <label
          className={`absolute transition-all duration-300 pointer-events-none z-10 ${
            isFocused || hasValue ? "text-xs font-medium -top-6 left-0" : "top-4 left-12"
          }`}
          style={{
            color: isFocused || hasValue ? "#1E90FF" : "#B0B0B0",
          }}
        >
          {placeholder}
          {required && (
            <span style={{ color: "#FF6B6B" }} className="ml-1">
              *
            </span>
          )}
        </label>

        {/* Icon */}
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
              isFocused ? "scale-110" : ""
            }`}
            style={{
              color: isFocused ? "#1E90FF" : error ? "#FF6B6B" : "#B0B0B0",
            }}
          />
        )}

        {/* Input field */}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl transition-all duration-300 backdrop-blur-sm focus:outline-none placeholder-transparent ${
            error ? "bg-red-900/20 focus:ring-4" : isFocused ? "shadow-lg focus:ring-4" : "hover:border-opacity-60"
          }`}
          style={{
            backgroundColor: error ? "rgba(239, 68, 68, 0.1)" : "#1E1E1E",
            borderColor: error ? "#FF6B6B" : isFocused ? "#1E90FF" : "#404040",
            color: "#E0E0E0",
            boxShadow: isFocused ? "0 0 0 4px rgba(30, 144, 255, 0.1)" : "none",
          }}
          {...props}
        />

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 hover:scale-110"
            style={{ color: "#B0B0B0" }}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Password strength indicator */}
      {showPasswordStrength && value && <PasswordStrength password={value} />}
    </div>
  )
}

// Animated Button component
const AnimatedButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={`relative w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-500 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group transform hover:scale-105 hover:-translate-y-1 ${className}`}
      style={{
        backgroundColor: isHovered && !disabled ? "#63B3ED" : "#1E90FF",
        color: "#FFFFFF",
        boxShadow: "0 10px 25px rgba(30, 144, 255, 0.3)",
      }}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background */}
      <div
        className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: "#63B3ED" }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Creating Account...</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Sparkle effect */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-2 right-2 h-4 w-4 text-white animate-pulse" />
          <Sparkles className="absolute bottom-2 left-2 h-3 w-3 text-white animate-pulse delay-300" />
          <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-white animate-pulse delay-150" />
        </div>
      )}
    </button>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else {
      const passwordRequirements = [
        { test: (pwd) => pwd.length >= 8, message: "Password must be at least 8 characters" },
        { test: (pwd) => /[A-Z]/.test(pwd), message: "Password must contain one uppercase letter" },
        { test: (pwd) => /[a-z]/.test(pwd), message: "Password must contain one lowercase letter" },
        { test: (pwd) => /\d/.test(pwd), message: "Password must contain one number" },
        { test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), message: "Password must contain one special character" },
      ]

      const failedRequirement = passwordRequirements.find((req) => !req.test(formData.password))
      if (failedRequirement) {
        newErrors.password = failedRequirement.message
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Strapi register API call
      const response = await fetch('https://fresh-egg-85913f543b.strapiapp.com/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setErrors({ general: data.error?.message || 'Registration failed' })
        setIsLoading(false)
        return
      }
      // Save only JWT
      localStorage.setItem('authToken', data.jwt)
      navigate('/login')
    } catch (err) {
      setErrors({ general: 'Unable to connect to server' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#121212" }}>
      {/* Background animations */}
      <FloatingParticles />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFA500 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Animated shapes */}
      <div
        className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 animate-bounce-slow"
        style={{ backgroundColor: "#1E90FF" }}
      />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
        style={{ backgroundColor: "#63B3ED" }}
      />
      <div
        className="absolute top-1/3 right-20 w-20 h-20 rounded-full opacity-20 animate-ping"
        style={{ backgroundColor: "#FFA500" }}
      />
      <div
        className="absolute bottom-1/3 left-20 w-24 h-24 rounded-full opacity-20 animate-bounce"
        style={{ backgroundColor: "#1E90FF" }}
      />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className={`max-w-lg w-full transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 group transition-all duration-300 hover:scale-105"
            style={{ color: "#B0B0B0" }}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Home</span>
          </Link>

          {/* Register Card */}
          <div
            className="backdrop-blur-lg rounded-3xl shadow-2xl border p-8 transform hover:scale-[1.01] transition-all duration-500"
            style={{
              backgroundColor: "#1E1E1E",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
                <div
                  className="p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  style={{ background: "linear-gradient(45deg, #1E90FF, #FFA500)" }}
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold" style={{ color: "#E0E0E0" }}>
                    4Task
                  </h1>
                  <p className="text-sm font-medium" style={{ color: "#B0B0B0" }}>
                    Task Management
                  </p>
                </div>
              </Link>
              <h2 className="text-3xl font-bold mb-2" style={{ color: "#E0E0E0" }}>
                Create Account
              </h2>
              <p style={{ color: "#B0B0B0" }}>Join us and start organizing your tasks efficiently</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <AnimatedInput
                  icon={User}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={!!errors.username}
                  required
                />
                {errors.username && (
                  <p className="text-sm animate-fadeIn ml-2" style={{ color: "#FF6B6B" }}>
                    {errors.username}
                  </p>
                )}

                <AnimatedInput
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  required
                />
                {errors.email && (
                  <p className="text-sm animate-fadeIn ml-2" style={{ color: "#FF6B6B" }}>
                    {errors.email}
                  </p>
                )}

                <AnimatedInput
                  icon={Lock}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  required
                  showPasswordStrength={true}
                />
                {errors.password && (
                  <p className="text-sm animate-fadeIn ml-2" style={{ color: "#FF6B6B" }}>
                    {errors.password}
                  </p>
                )}

                <AnimatedInput
                  icon={Shield}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!errors.confirmPassword}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-sm animate-fadeIn ml-2" style={{ color: "#FF6B6B" }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.general && (
                <div
                  className="px-4 py-3 rounded-xl text-sm animate-fadeIn text-center border"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "#FF6B6B",
                    color: "#FF6B6B",
                  }}
                >
                  {errors.general}
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded transition-all duration-200"
                  style={{
                    accentColor: "#1E90FF",
                    backgroundColor: "#1E1E1E",
                    borderColor: "#404040",
                  }}
                />
                <span className="ml-2 text-sm" style={{ color: "#B0B0B0" }}>
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium hover:opacity-80" style={{ color: "#FFA500" }}>
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium hover:opacity-80" style={{ color: "#FFA500" }}>
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <AnimatedButton type="submit" loading={isLoading}>
                Create Account
              </AnimatedButton>

              <div className="text-center">
                <span className="text-sm" style={{ color: "#B0B0B0" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold transition-all duration-200 hover:scale-105 inline-block hover:opacity-80"
                    style={{ color: "#FFA500" }}
                  >
                    Sign In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(8px) rotate(240deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-25px) scale(1.1);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
