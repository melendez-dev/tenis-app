import { Montserrat } from 'next/font/google'
import './globals.css'
import NextAuthProvider from '@/app/lib/NextAuthProvider'

const font = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'tenis-tourments',
  description: "Sebastian Melendez's project",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider> 
      </body>
    </html>
  )
}
