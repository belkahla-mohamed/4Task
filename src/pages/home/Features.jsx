import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import {
  WifiOff,
  Filter,
  Bell,
  BarChart3,
  Palette,
  FolderSyncIcon as Sync,
} from "lucide-react"

export default function Features() {
  const { t, isRTL } = useTranslation()

  const features = [
    {
      icon: <WifiOff className="h-8 w-8" />,
      title: t("offlineFirstDesign"),
      description: t("offlineFirstDesc"),
      color: "text-primary",
    },
    {
      icon: <Sync className="h-8 w-8" />,
      title: t("smartSynchronization"),
      description: t("smartSyncDesc"),
      color: "text-accent",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: t("beautifulThemes"),
      description: t("beautifulThemesDesc"),
      color: "text-secondary",
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: t("advancedFiltering"),
      description: t("advancedFilteringDesc"),
      color: "text-primary",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: t("smartNotifications"),
      description: t("smartNotificationsDesc"),
      color: "text-accent",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: t("productivityAnalytics"),
      description: t("productivityAnalyticsDesc"),
      color: "text-secondary",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <BarChart3 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("features")}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("featuresTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("featuresDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-md group"
            >
              <CardHeader className={isRTL ? "text-right" : "text-left"}>
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 