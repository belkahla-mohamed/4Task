import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TranslationProvider } from "@/components/translation-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "4Task - Modern Task Management",
  description: "A modern, offline-first task management application",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TranslationProvider>
            {children}
            <Toaster />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
