import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "@/components/translation-provider"
import { ArrowRight, Download } from "lucide-react"

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">{t("readyToTransform")}</h2>
        <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-background text-primary hover:bg-background/90 px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            asChild
          >
            <Link to="/dashboard">
              {t("startFreeToday")}
              <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 bg-transparent shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Download className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
            {t("downloadApp")}
          </Button>
        </div>
      </div>
    </section>
  )
} 