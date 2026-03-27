import type { Metadata } from 'next';
import { Geist, Geist_Mono, Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

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
      path: '../../public/fonts/CONSOLA.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CONSOLAB.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CONSOLAI.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/CONSOLAZ.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
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
        className={`${geistSans.variable} ${geistMono.variable} ${consolas.variable} ${outfit.variable} min-h-screen antialiased`}
      >
        <main className="container mx-auto px-6 py-10 font-sans md:max-w-xl lg:max-w-3xl">
          {children}
        </main>
      </body>
    </html>
  );
}
