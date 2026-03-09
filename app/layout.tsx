import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AntdProvider } from '@/components/providers/AntdProvider'
import './globals.css'
import ToastProvider from '@/components/ToastProvider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'A modern photo sharing and commenting app',
  generator: 'Next.js',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ToastProvider>
        <AntdProvider>
          {children}
        </AntdProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
