import { Inter } from 'next/font/google'
import { GameProvider } from './contexts/GameContext'
import './globals.css'
import './styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Video Game Studio Clicker',
  description: 'Build your video game studio from the ground up',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
