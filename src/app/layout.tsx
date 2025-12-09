import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Explore characters from the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col relative z-10">
            <Header />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <footer className="border-t py-8 mt-auto relative z-10" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="max-w-7xl mx-auto px-8 text-center">
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Data from{" "}
                  <a 
                    href="https://rickandmortyapi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-colors hover:opacity-70"
                    style={{ color: 'var(--foreground)' }}
                  >
                    rickandmortyapi.com
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
