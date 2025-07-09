import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/components/translation-provider"
import { ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("stayUpdated")}</h2>
          <p className="text-xl text-muted-foreground mb-8">{t("newsletterDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border shadow-sm focus:shadow-md transition-shadow duration-200"
            />
            <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              {t("subscribe")}
              <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 