import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { WifiStatus } from "@/components/wifi-status"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle } from "lucide-react"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
          <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
            <CheckCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">4Task</h1>
        </Link>


        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <WifiStatus />
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Link to="/dashboard">{t("getStarted")}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 