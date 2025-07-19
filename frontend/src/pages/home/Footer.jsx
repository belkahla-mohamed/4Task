"use client"

import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { CheckCircle, Twitter, Github, Mail, ArrowUpRight, Heart } from "lucide-react"
import { useState } from "react"

// Custom Button component for social icons
const SocialButton = ({ children, href, className = "", ...props }) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group ${className}`}
      {...props}
    >
      <span className="transform group-hover:scale-110 transition-transform duration-200">{children}</span>
    </a>
  )
}

// Custom Link component with modern hover effects
const FooterLink = ({ to, children, className = "", external = false }) => {
  const [hovered, setHovered] = useState(false)
  const baseClasses =
    "group inline-flex items-center text-gray-600 transition-all duration-300 font-medium"

  if (external) {
    return (
      <a href={to} className={`${baseClasses} ${className}`}
        style={{
          color: hovered ? (document.documentElement.classList.contains('dark') ? '#fff' : '#000') : undefined,
          background: hovered && document.documentElement.classList.contains('dark') ? 'var(--color-card)' : undefined,
          borderRadius: hovered ? '0.5rem' : undefined,
          padding: hovered ? '0.25rem 0.5rem' : undefined,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        target="_blank" rel="noopener noreferrer">
        <span className="group-hover:translate-x-1 transition-transform duration-200">{children}</span>
        <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200" />
      </a>
    )
  }

  return (
    <Link to={to} className={`${baseClasses} ${className}`}
      style={{
        color: hovered ? (document.documentElement.classList.contains('dark') ? '#fff' : '#000') : undefined,
        background: hovered && document.documentElement.classList.contains('dark') ? 'var(--color-card)' : undefined,
        borderRadius: hovered ? '0.5rem' : undefined,
        padding: hovered ? '0.25rem 0.5rem' : undefined,
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="group-hover:translate-x-1 transition-transform duration-200">{children}</span>
      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200" />
    </Link>
  )
}

export default function Footer() {
  const { t, isRTL } = useTranslation()

  const footerSections = [
    {
      title: t("product") || "Product",
      links: [
        { label: t("features") || "Features", to: "/features" },
        { label: t("pricing") || "Pricing", to: "/pricing" },
        { label: t("integrations") || "Integrations", to: "/integrations" },
        { label: t("api") || "API", to: "/api", external: true },
      ],
    },
    {
      title: t("company") || "Company",
      links: [
        { label: t("about") || "About", to: "/about" },
        { label: t("blog") || "Blog", to: "/blog" },
        { label: t("careers") || "Careers", to: "/careers" },
        { label: t("contact") || "Contact", to: "/contact" },
      ],
    },
    {
      title: t("support") || "Support",
      links: [
        { label: t("helpCenter") || "Help Center", to: "/help", external: true },
        { label: t("documentation") || "Documentation", to: "/docs", external: true },
        { label: t("status") || "Status", to: "/status", external: true },
        { label: t("privacy") || "Privacy", to: "/privacy" },
      ],
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className={`lg:col-span-2 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center space-x-3 rtl:space-x-reverse group">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      4Task
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">Task Management</p>
                  </div>
                </Link>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
                {t("footerDescription") ||
                  "Streamline your workflow and boost productivity with our intuitive task management platform designed for modern teams."}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 rtl:space-x-reverse mb-8">
                <SocialButton href="https://twitter.com/4task">
                  <Twitter className="h-4 w-4" />
                </SocialButton>
                <SocialButton href="https://github.com/4task">
                  <Github className="h-4 w-4" />
                </SocialButton>
                <SocialButton href="mailto:hello@4task.com">
                  <Mail className="h-4 w-4" />
                </SocialButton>
              </div>

              
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className={isRTL ? "text-right" : "text-left"}>
                <h4 className="font-bold text-gray-900 mb-6 text-lg relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <FooterLink to={link.to} external={link.external}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>&copy; 2024 4Task.</span>
              <span>{t("allRightsReserved") || "All rights reserved."}</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>for productivity</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 rtl:space-x-reverse text-sm">
              <FooterLink to="/privacy">{t("privacyPolicy") || "Privacy Policy"}</FooterLink>
              <FooterLink to="/terms">{t("termsOfService") || "Terms of Service"}</FooterLink>
              <FooterLink to="/cookies">{t("cookiePolicy") || "Cookie Policy"}</FooterLink>
              <FooterLink to="/security">Security</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
      </div>
    </footer>
  )
}
