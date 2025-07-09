"use client"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useTranslation } from "@/components/translation-provider"

export function LanguageSwitcher() {
  const { language, switchLanguage } = useTranslation()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => switchLanguage(language === "en" ? "ar" : "en")}
      className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border hover:bg-muted transition-all duration-200 hover:scale-105 transform"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
