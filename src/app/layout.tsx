import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@lib/constants';
import Footer from '@components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const consolas = localFont({
  variable: '--font-consolas',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/consola.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/consolab.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/consolai.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/consolaz.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: 'Shubhankar' }],
  creator: 'Shubhankar',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${consolas.variable} antialiased`}
      >
        <main className="container mx-auto flex min-h-screen flex-col px-6 py-6 font-sans sm:py-10 md:max-w-xl lg:max-w-3xl">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="/analytics.js"
            data-website-id="02660cb9-c256-44d6-8ab6-3fa6e5f33c8a"
            data-domains="blog.shubhankarval.dev,www.blog.shubhankarval.dev"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
