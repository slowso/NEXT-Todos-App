import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FootNav from '@/components/footer/FootNav'
import Providers from '@/lib/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next todo app',
  description: 'Todos App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
      <FootNav />
    </html>
  )
}
