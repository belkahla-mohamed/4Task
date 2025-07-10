"use client"

import { createContext, useContext, useState, useEffect } from "react"

const TranslationContext = createContext()

const translations = {
  en: {
    // Header
    features: "Features",
    howItWorks: "How it Works",
    reviews: "Reviews",
    contact: "Contact",
    getStarted: "Get Started",
    online: "Online",
    offline: "Offline",

    // Hero Section
    offlineFirstTaskManagement: "Offline-First Task Management",
    stayProductive: "Stay Productive",
    anywhereAnytime: "Anywhere, Anytime",
    heroDescription:
      "The modern task management app that works seamlessly online and offline. Built with React and Strapi for ultimate productivity.",
    startManagingTasks: "Start Managing Tasks",
    watchDemo: "Watch Demo",
    offlineReady: "Offline Ready",
    lightningFast: "Lightning Fast",
    secure: "Secure",

    // Features
    featuresTitle: "Everything You Need for Productivity",
    featuresDescription:
      "Powerful features designed to keep you organized and productive, whether you're online or offline.",
    offlineFirstDesign: "Offline-First Design",
    offlineFirstDesc:
      "Work seamlessly without internet. Your tasks are always accessible and automatically sync when online.",
    smartSynchronization: "Smart Synchronization",
    smartSyncDesc: "Intelligent sync with Strapi backend ensures your data is always up-to-date across all devices.",
    beautifulThemes: "Beautiful Themes",
    beautifulThemesDesc:
      "Carefully crafted dark and light modes with custom color palettes for comfortable usage anytime.",
    advancedFiltering: "Advanced Filtering",
    advancedFilteringDesc:
      "Powerful search and filtering by status, priority, category, and due dates to find tasks instantly.",
    smartNotifications: "Smart Notifications",
    smartNotificationsDesc: "Never miss a deadline with intelligent reminders and due date notifications.",
    productivityAnalytics: "Productivity Analytics",
    productivityAnalyticsDesc:
      "Visual insights into your productivity patterns, completion rates, and task distribution.",

    // How It Works
    howItWorksTitle: "Simple Steps to Better Productivity",
    howItWorksDescription: "Get started with 4Task in minutes and transform how you manage your daily tasks.",
    createYourTasks: "Create Your Tasks",
    createTasksDesc: "Add tasks with titles, descriptions, priorities, categories, and due dates in seconds.",
    organizeFilter: "Organize & Filter",
    organizeFilterDesc: "Use powerful filters and search to organize your tasks exactly how you want them.",
    trackProgress: "Track Progress",
    trackProgressDesc: "Move tasks through pending, in-progress, and done states with visual progress tracking.",
    staySynced: "Stay Synced",
    staySyncedDesc: "Your tasks automatically sync across all devices when you're online.",

    // Stats
    activeUsers: "Active Users",
    tasksCompleted: "Tasks Completed",
    uptime: "Uptime",
    offlineSupport: "Offline Support",

    // Testimonials
    testimonialsTitle: "What Our Users Say",
    testimonialsDescription: "Join thousands of satisfied users who have transformed their productivity with 4Task.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Everything you need to know about 4Task and how it can help you stay productive.",

    // Newsletter
    stayUpdated: "Stay Updated with 4Task",
    newsletterDesc: "Get the latest updates, productivity tips, and feature announcements delivered to your inbox.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",

    // Contact
    contactTitle: "Get in Touch",
    contactDescription: "Have questions or feedback? We'd love to hear from you. Reach out to our team anytime.",
    emailSupport: "Email Support",
    getHelpEmail: "Get help via email",
    phoneSupport: "Phone Support",
    callDirectly: "Call us directly",
    officeLocation: "Office Location",
    visitOffice: "Visit our office",

    // CTA
    readyToTransform: "Ready to Transform Your Productivity?",
    ctaDescription: "Join thousands of users who have already discovered the power of offline-first task management.",
    startFreeToday: "Start Free Today",
    downloadApp: "Download App",

    // Footer
    footerDescription: "The modern task management app that works seamlessly online and offline.",
    product: "Product",
    pricing: "Pricing",
    integrations: "Integrations",
    api: "API",
    company: "Company",
    about: "About",
    blog: "Blog",
    careers: "Careers",
    support: "Support",
    helpCenter: "Help Center",
    documentation: "Documentation",
    status: "Status",
    privacy: "Privacy",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
  },
  ar: {
    // Header
    features: "المميزات",
    howItWorks: "كيف يعمل",
    reviews: "التقييمات",
    contact: "اتصل بنا",
    getStarted: "ابدأ الآن",
    online: "متصل",
    offline: "غير متصل",

    // Hero Section
    offlineFirstTaskManagement: "إدارة المهام بدون إنترنت",
    stayProductive: "ابق منتجاً",
    anywhereAnytime: "في أي مكان وزمان",
    heroDescription:
      "تطبيق إدارة المهام الحديث الذي يعمل بسلاسة عبر الإنترنت وبدونه. مبني بـ React و Strapi للإنتاجية القصوى.",
    startManagingTasks: "ابدأ إدارة المهام",
    watchDemo: "شاهد العرض",
    offlineReady: "جاهز بدون إنترنت",
    lightningFast: "سريع البرق",
    secure: "آمن",

    // Features
    featuresTitle: "كل ما تحتاجه للإنتاجية",
    featuresDescription: "ميزات قوية مصممة لتبقيك منظماً ومنتجاً، سواء كنت متصلاً بالإنترنت أم لا.",
    offlineFirstDesign: "تصميم يعمل بدون إنترنت",
    offlineFirstDesc: "اعمل بسلاسة بدون إنترنت. مهامك متاحة دائماً وتتزامن تلقائياً عند الاتصال.",
    smartSynchronization: "مزامنة ذكية",
    smartSyncDesc: "مزامنة ذكية مع خادم Strapi تضمن أن بياناتك محدثة دائماً عبر جميع الأجهزة.",
    beautifulThemes: "تصاميم جميلة",
    beautifulThemesDesc: "أوضاع داكنة وفاتحة مصممة بعناية مع لوحات ألوان مخصصة للاستخدام المريح في أي وقت.",
    advancedFiltering: "تصفية متقدمة",
    advancedFilteringDesc: "بحث وتصفية قوية حسب الحالة والأولوية والفئة وتواريخ الاستحقاق للعثور على المهام فوراً.",
    smartNotifications: "إشعارات ذكية",
    smartNotificationsDesc: "لا تفوت أي موعد نهائي مع التذكيرات الذكية وإشعارات تواريخ الاستحقاق.",
    productivityAnalytics: "تحليلات الإنتاجية",
    productivityAnalyticsDesc: "رؤى بصرية لأنماط إنتاجيتك ومعدلات الإنجاز وتوزيع المهام.",

    // How It Works
    howItWorksTitle: "خطوات بسيطة لإنتاجية أفضل",
    howItWorksDescription: "ابدأ مع 4Task في دقائق وحول طريقة إدارة مهامك اليومية.",
    createYourTasks: "أنشئ مهامك",
    createTasksDesc: "أضف مهام بعناوين وأوصاف وأولويات وفئات وتواريخ استحقاق في ثوانٍ.",
    organizeFilter: "نظم وصفي",
    organizeFilterDesc: "استخدم المرشحات القوية والبحث لتنظيم مهامك بالطريقة التي تريدها تماماً.",
    trackProgress: "تتبع التقدم",
    trackProgressDesc: "انقل المهام عبر حالات الانتظار والتقدم والإنجاز مع تتبع التقدم البصري.",
    staySynced: "ابق متزامناً",
    staySyncedDesc: "تتزامن مهامك تلقائياً عبر جميع الأجهزة عندما تكون متصلاً بالإنترنت.",

    // Stats
    activeUsers: "المستخدمون النشطون",
    tasksCompleted: "المهام المكتملة",
    uptime: "وقت التشغيل",
    offlineSupport: "الدعم بدون إنترنت",

    // Testimonials
    testimonialsTitle: "ماذا يقول مستخدمونا",
    testimonialsDescription: "انضم إلى آلاف المستخدمين الراضين الذين حولوا إنتاجيتهم مع 4Task.",

    // FAQ
    faqTitle: "الأسئلة الشائعة",
    faqDescription: "كل ما تحتاج لمعرفته حول 4Task وكيف يمكن أن يساعدك في البقاء منتجاً.",

    // Newsletter
    stayUpdated: "ابق محدثاً مع 4Task",
    newsletterDesc: "احصل على آخر التحديثات ونصائح الإنتاجية وإعلانات الميزات في صندوق بريدك.",
    enterEmail: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",

    // Contact
    contactTitle: "تواصل معنا",
    contactDescription: "لديك أسئلة أو ملاحظات؟ نحب أن نسمع منك. تواصل مع فريقنا في أي وقت.",
    emailSupport: "دعم البريد الإلكتروني",
    getHelpEmail: "احصل على المساعدة عبر البريد الإلكتروني",
    phoneSupport: "دعم الهاتف",
    callDirectly: "اتصل بنا مباشرة",
    officeLocation: "موقع المكتب",
    visitOffice: "زر مكتبنا",

    // CTA
    readyToTransform: "مستعد لتحويل إنتاجيتك؟",
    ctaDescription: "انضم إلى آلاف المستخدمين الذين اكتشفوا بالفعل قوة إدارة المهام بدون إنترنت.",
    startFreeToday: "ابدأ مجاناً اليوم",
    downloadApp: "حمل التطبيق",

    // Footer
    footerDescription: "تطبيق إدارة المهام الحديث الذي يعمل بسلاسة عبر الإنترنت وبدونه.",
    product: "المنتج",
    pricing: "التسعير",
    integrations: "التكاملات",
    api: "واجهة برمجة التطبيقات",
    company: "الشركة",
    about: "حول",
    blog: "المدونة",
    careers: "الوظائف",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    documentation: "التوثيق",
    status: "الحالة",
    privacy: "الخصوصية",
    allRightsReserved: "جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    cookiePolicy: "سياسة ملفات تعريف الارتباط",
  },
}

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)
    setIsRTL(savedLanguage === "ar")
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = savedLanguage
  }, [])

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    setIsRTL(newLanguage === "ar")
    localStorage.setItem("language", newLanguage)
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLanguage
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <TranslationContext.Provider value={{ language, switchLanguage, t, isRTL }}>{children}</TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
