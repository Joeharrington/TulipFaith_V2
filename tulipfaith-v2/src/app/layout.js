import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import ServiceWorkerRegistrar from "@/components/pwa/ServiceWorkerRegistrar";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
  display:  "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets:  ["latin"],
  weight:   ["400", "500"],
  style:    ["normal", "italic"],
  display:  "swap",
});

export const metadata = {
  title:       "Tulip Faith — Story, Scripture, and the Hope of Christ",
  description: "A faith-and-story platform honoring Susan Harrington and drawing people closer to Jesus through storytelling, Scripture, reflection, and prayer.",
  openGraph: {
    title:       "Tulip Faith",
    description: "Story, Scripture, and the Hope of Christ",
    type:        "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TulipFaith",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#2E1045" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <AuthProvider>
          <ServiceWorkerRegistrar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
