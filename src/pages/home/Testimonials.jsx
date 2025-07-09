import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Star, Users } from "lucide-react"

export default function Testimonials() {
  const { t, isRTL } = useTranslation()

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "4Task has revolutionized how I manage my daily workflow. The offline capability is a game-changer!",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      role: "Software Developer",
      content: "Finally, a task manager that works perfectly offline. The sync feature is seamless and reliable.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Freelance Designer",
      content: "The beautiful interface and dark mode make task management actually enjoyable. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <Users className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t("reviews")}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("testimonialsTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("testimonialsDescription")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="flex mb-4 group-hover:scale-105 transition-transform duration-200">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic group-hover:text-foreground transition-colors duration-200">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 