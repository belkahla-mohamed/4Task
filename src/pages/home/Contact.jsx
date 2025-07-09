import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/translation-provider"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const { t, isRTL } = useTranslation()

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <Mail className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("contact")}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("contactTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contactDescription")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card border-border text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold text-card-foreground mb-2">{t("emailSupport")}</h3>
              <p className="text-muted-foreground mb-4">{t("getHelpEmail")}</p>
              <Button
                variant="outline"
                className="border-border bg-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                support@4task.com
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold text-card-foreground mb-2">{t("phoneSupport")}</h3>
              <p className="text-muted-foreground mb-4">{t("callDirectly")}</p>
              <Button
                variant="outline"
                className="border-border bg-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                +1 (555) 123-4567
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold text-card-foreground mb-2">{t("officeLocation")}</h3>
              <p className="text-muted-foreground mb-4">{t("visitOffice")}</p>
              <Button
                variant="outline"
                className="border-border bg-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                San Francisco, CA
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 