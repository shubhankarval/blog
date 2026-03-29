import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
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
  title: "Shubhankar's Blog",
  description: 'A blog about web development, programming, and technology.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${consolas.variable} antialiased`}
      >
        <main className="container mx-auto flex min-h-screen flex-col px-6 py-6 font-sans sm:py-10 md:max-w-xl lg:max-w-3xl">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
