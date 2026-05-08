import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Modern, clean Sans-Serif for standard text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Elegant Serif for Headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "AR Nuts & Snacks | Premium Dry Fruits",
  description: "Modern luxury snack brand. Premium quality dry fruits, organic nuts, and healthy snacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full`}
      suppressHydrationWarning
    >
      {/* Moved the background and text colors directly here! */}
      <body 
        className="min-h-full flex flex-col font-sans bg-brand-cream text-brand-black antialiased" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}