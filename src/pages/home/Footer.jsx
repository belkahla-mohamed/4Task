import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/components/translation-provider"
import {
  CheckCircle,
  Twitter,
  Github,
  Mail,
} from "lucide-react"

export default function Footer() {
  const { t, isRTL } = useTranslation()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className={isRTL ? "text-right" : "text-left"}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 group">
              <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">4Task</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t("footerDescription")}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("product")}</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  to="#features"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("integrations")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("api")}
                </Link>
              </li>
            </ul>
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("company")}</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("careers")}
                </Link>
              </li>
              <li>
                <Link
                  to="#contact"
                  className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("support")}</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
                  {t("documentation")}
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
                  {t("status")}
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="bg-gray-200 dark:bg-gray-700 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 4Task. {t("allRightsReserved")}</p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
              {t("privacyPolicy")}
            </Link>
            <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
              {t("termsOfService")}
            </Link>
            <Link to="#" className="hover:text-primary transition-colors duration-200 hover:scale-105">
              {t("cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 