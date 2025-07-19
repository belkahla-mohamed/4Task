"use client"

import { useTranslation } from "@/components/translation-provider"
import Header from "./home/Header"
import Hero from "./home/Hero"
import Features from "./home/Features"
import HowItWorks from "./home/HowItWorks"
import Stats from "./home/Stats"
import Testimonials from "./home/Testimonials"
import FAQ from "./home/FAQ"
import Newsletter from "./home/Newsletter"
import Contact from "./home/Contact"
import CTA from "./home/CTA"
import Footer from "./home/Footer"

export default function Home() {
  const { isRTL } = useTranslation()

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isRTL ? "font-sans" : ""}`}>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
      <Newsletter />
      <CTA />
      <Footer />
    </div>
  )
}
