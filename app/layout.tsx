import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'

import { ReactQueryMantineProvider } from '@/provider/ReactQueryMantineProvider'

import { Metrika } from '@/components/Metrika/Metrika'
import { Suspense } from 'react'

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
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  )
}
