import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personalProfile } from "@/data/profile";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhemelhasan.com"),
  title: `${personalProfile.name} — ${personalProfile.roleTitle}`,
  description: personalProfile.tagline,
  icons: {
    icon: [
      {
        url: "/brand/favicon/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/brand/favicon/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/brand/favicon/favicon.ico",
    apple: "/brand/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: `${personalProfile.name} — ${personalProfile.roleTitle}`,
    description: personalProfile.tagline,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/brand/social/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: `${personalProfile.name} — ${personalProfile.roleTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalProfile.name} — ${personalProfile.roleTitle}`,
    description: personalProfile.tagline,
    images: ["/brand/social/og-image-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased text-text-primary bg-canvas selection:bg-accent-soft selection:text-accent-sky"
      >
        {children}
      </body>
    </html>
  );
}
