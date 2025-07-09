import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import {
  Filter,
  Target,
  Cloud,
  Plus,
  Layers,
} from "lucide-react"

export default function HowItWorks() {
  const { t, isRTL } = useTranslation()

  const steps = [
    {
      number: "01",
      title: t("createYourTasks"),
      description: t("createTasksDesc"),
      icon: <Plus className="h-6 w-6" />,
    },
    {
      number: "02",
      title: t("organizeFilter"),
      description: t("organizeFilterDesc"),
      icon: <Filter className="h-6 w-6" />,
    },
    {
      number: "03",
      title: t("trackProgress"),
      description: t("trackProgressDesc"),
      icon: <Target className="h-6 w-6" />,
    },
    {
      number: "04",
      title: t("staySynced"),
      description: t("staySyncedDesc"),
      icon: <Cloud className="h-6 w-6" />,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <Layers className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("howItWorks")}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("howItWorksTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("howItWorksDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`text-center group ${isRTL ? "text-right" : "text-left"} md:text-center`}>
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto bg-secondary text-secondary-foreground text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 