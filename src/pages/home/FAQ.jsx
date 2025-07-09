"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield } from "lucide-react"

export default function FAQ() {
  const { t, isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const faqs = [
    {
      question: "How does offline functionality work?",
      answer:
        "4Task uses IndexedDB to store all your tasks locally in your browser. You can create, edit, and manage tasks without any internet connection. When you're back online, everything syncs automatically with our Strapi backend.",
      delay: "delay-100",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-blue-500",
        primaryHover: "group-hover:bg-blue-600",
        text: "text-blue-500",
        textHover: "hover:text-blue-600",
        bg: "bg-blue-50",
        bgDark: "bg-blue-500/10",
        border: "border-blue-200",
        shadow: "hover:shadow-blue-500/20",
        glow: "from-blue-500/10 to-blue-500/5",
        accent: "from-blue-500 via-blue-400 to-blue-600",
        particle: "bg-blue-400/30",
        ring: "ring-blue-500/20",
      },
    },
    {
      question: "Is my data secure?",
      answer:
        "Your data is encrypted both locally and during transmission. We use industry-standard security practices and never share your personal information with third parties.",
      delay: "delay-200",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-emerald-500",
        primaryHover: "group-hover:bg-emerald-600",
        text: "text-emerald-500",
        textHover: "hover:text-emerald-600",
        bg: "bg-emerald-50",
        bgDark: "bg-emerald-500/10",
        border: "border-emerald-200",
        shadow: "hover:shadow-emerald-500/20",
        glow: "from-emerald-500/10 to-emerald-500/5",
        accent: "from-emerald-500 via-emerald-400 to-emerald-600",
        particle: "bg-emerald-400/30",
        ring: "ring-emerald-500/20",
      },
    },
    {
      question: "Can I use 4Task on multiple devices?",
      answer:
        "Yes! Once you create an account, your tasks sync across all your devices. Start a task on your phone and finish it on your computer seamlessly.",
      delay: "delay-300",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-purple-500",
        primaryHover: "group-hover:bg-purple-600",
        text: "text-purple-500",
        textHover: "hover:text-purple-600",
        bg: "bg-purple-50",
        bgDark: "bg-purple-500/10",
        border: "border-purple-200",
        shadow: "hover:shadow-purple-500/20",
        glow: "from-purple-500/10 to-purple-500/5",
        accent: "from-purple-500 via-purple-400 to-purple-600",
        particle: "bg-purple-400/30",
        ring: "ring-purple-500/20",
      },
    },
    {
      question: "What happens if I lose internet connection?",
      answer:
        "Nothing changes! 4Task is designed to work offline-first. You can continue working normally, and all changes will sync automatically when your connection returns.",
      delay: "delay-400",
      direction: "translate-x-[100px]",
      colors: {
        primary: "bg-orange-500",
        primaryHover: "group-hover:bg-orange-600",
        text: "text-orange-500",
        textHover: "hover:text-orange-600",
        bg: "bg-orange-50",
        bgDark: "bg-orange-500/10",
        border: "border-orange-200",
        shadow: "hover:shadow-orange-500/20",
        glow: "from-orange-500/10 to-orange-500/5",
        accent: "from-orange-500 via-orange-400 to-orange-600",
        particle: "bg-orange-400/30",
        ring: "ring-orange-500/20",
      },
    },
    {
      question: "Is 4Task free to use?",
      answer:
        "Yes, 4Task is completely free to use with all features included. We believe productivity tools should be accessible to everyone.",
      delay: "delay-500",
      direction: "translate-x-[-100px]",
      colors: {
        primary: "bg-pink-500",
        primaryHover: "group-hover:bg-pink-600",
        text: "text-pink-500",
        textHover: "hover:text-pink-600",
        bg: "bg-pink-50",
        bgDark: "bg-pink-500/10",
        border: "border-pink-200",
        shadow: "hover:shadow-pink-500/20",
        glow: "from-pink-500/10 to-pink-500/5",
        accent: "from-pink-500 via-pink-400 to-pink-600",
        particle: "bg-pink-400/30",
        ring: "ring-pink-500/20",
      },
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with fly-in animation */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-50px]"
          } ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <Badge
            className={`bg-gradient-to-r from-blue-500/10 via-emerald-500/10 via-purple-500/10 via-orange-500/10 to-pink-500/10 text-foreground border-border/20 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Shield className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            FAQ
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 via-purple-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
            {t("faqTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("faqDescription")}</p>
        </div>

        {/* FAQ Accordion with color-coded animations */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`
                  relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl
                  shadow-lg hover:shadow-2xl transition-all duration-700 ease-out
                  hover:scale-[1.02] hover:-translate-y-1 group
                  ${faq.colors.shadow}
                  ${isVisible ? `opacity-100 translate-x-0 ${faq.delay}` : `opacity-0 ${faq.direction}`}
                `}
                style={{
                  transitionDelay: isVisible ? faq.delay.replace("delay-", "") + "ms" : "0ms",
                }}
              >
                {/* Animated background gradient with FAQ colors */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${faq.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Floating particles with FAQ colors */}
                <div
                  className={`absolute top-4 right-4 w-2 h-2 ${faq.colors.particle} rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute bottom-4 left-4 w-1 h-1 ${faq.colors.particle} rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 px-8 py-2">
                  <AccordionTrigger
                    className={`
                      text-foreground ${faq.colors.textHover} transition-all duration-300 
                      hover:no-underline text-lg font-semibold py-6
                      ${isRTL ? "text-right" : "text-left"}
                      group-hover:scale-[1.01] transform-gpu
                    `}
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      {/* Question number with FAQ colors */}
                      <div
                        className={`
                          w-8 h-8 ${faq.colors.primary} text-white rounded-full 
                          flex items-center justify-center text-sm font-bold
                          group-hover:scale-110 transition-transform duration-300
                        `}
                      >
                        {index + 1}
                      </div>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent
                    className={`
                      text-muted-foreground group-hover:text-foreground/80 
                      transition-colors duration-300 pb-6 text-base leading-relaxed
                      ${isRTL ? "text-right" : "text-left"}
                    `}
                  >
                    <div className="pl-12 rtl:pr-12 rtl:pl-0">{faq.answer}</div>
                  </AccordionContent>
                </div>

                {/* Animated border with FAQ colors */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${faq.colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                {/* Enhanced glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${faq.colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                />

                {/* Pulsing ring effect */}
                <div
                  className={`absolute inset-0 rounded-2xl ${faq.colors.ring} ring-2 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500`}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* FAQ indicators */}
        <div className="flex justify-center items-center mt-16 space-x-3 rtl:space-x-reverse">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${faq.colors.primary} transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? index * 100 + 1000 + "ms" : "0ms",
              }}
            />
          ))}
        </div>

        {/* Help section */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200 font-medium">
              Contact our support team
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
