import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'

import { ReactQueryMantineProvider } from '@/provider/ReactQueryMantineProvider'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Едадед',
  description: 'Электронное меню',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ReactQueryMantineProvider>{children}</ReactQueryMantineProvider>
      </body>
    </html>
  )
}
