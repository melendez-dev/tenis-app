import { Montserrat } from 'next/font/google'
import Providers from './ui/Providers'

import './globals.css'

const font = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'tenis-tourments',
  description: "Sebastian Melendez's project",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers children={children}/>
      </body>
    </html>
  )
}
