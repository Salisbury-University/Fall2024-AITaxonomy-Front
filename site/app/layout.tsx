
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Footer } from "@/components/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="p-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
