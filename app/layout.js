import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ian Shikami | Data Analyst Portfolio",
  description: "Data Analyst skilled in SQL, PostgreSQL, Excel, Power BI, Tableau, and Python. Transforming raw data into actionable business insights.",
  keywords: "data analyst, SQL, PostgreSQL, Excel, Power BI, Tableau, Python, data analysis, business intelligence, Nairobi, Kenya",
  authors: [{ name: "Ian Shikami" }],
  openGraph: {
    title: "Ian Shikami | Data Analyst Portfolio",
    description: "Data Analyst skilled in SQL, PostgreSQL, Excel, Power BI, Tableau, and Python. Transforming raw data into actionable business insights.",
    url: "https://your-domain.com",
    siteName: "Ian Shikami Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Shikami - Data Analyst Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Shikami | Data Analyst Portfolio",
    description: "Data Analyst skilled in SQL, PostgreSQL, Excel, Power BI, Tableau, and Python.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#222222] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}