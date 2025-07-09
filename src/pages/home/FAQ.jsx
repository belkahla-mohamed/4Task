import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/translation-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield } from "lucide-react"

export default function FAQ() {
  const { t, isRTL } = useTranslation()

  const faqs = [
    {
      question: "How does offline functionality work?",
      answer:
        "4Task uses IndexedDB to store all your tasks locally in your browser. You can create, edit, and manage tasks without any internet connection. When you're back online, everything syncs automatically with our Strapi backend.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Your data is encrypted both locally and during transmission. We use industry-standard security practices and never share your personal information with third parties.",
    },
    {
      question: "Can I use 4Task on multiple devices?",
      answer:
        "Yes! Once you create an account, your tasks sync across all your devices. Start a task on your phone and finish it on your computer seamlessly.",
    },
    {
      question: "What happens if I lose internet connection?",
      answer:
        "Nothing changes! 4Task is designed to work offline-first. You can continue working normally, and all changes will sync automatically when your connection returns.",
    },
    {
      question: "Is 4Task free to use?",
      answer:
        "Yes, 4Task is completely free to use with all features included. We believe productivity tools should be accessible to everyone.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <Shield className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            FAQ
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("faqTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("faqDescription")}</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted/50 rounded-lg px-6 border-border shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger
                  className={`text-foreground hover:text-primary transition-colors duration-200 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 