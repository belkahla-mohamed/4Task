import { useTranslation } from "@/components/translation-provider"

export default function Stats() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
              10K+
            </div>
            <div className="text-primary-foreground/80">{t("activeUsers")}</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">1M+</div>
            <div className="text-primary-foreground/80">{t("tasksCompleted")}</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
              99.9%
            </div>
            <div className="text-primary-foreground/80">{t("uptime")}</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
              24/7
            </div>
            <div className="text-primary-foreground/80">{t("offlineSupport")}</div>
          </div>
        </div>
      </div>
    </section>
  )
} 