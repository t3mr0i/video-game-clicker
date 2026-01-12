import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { GameProvider } from './contexts/GameContext'
import ErrorBoundary from './components/ErrorBoundary'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata = {
  title: 'Video Game Studio Clicker',
  description: 'Build your video game studio from the ground up',
  keywords: ['game dev', 'simulation', 'clicker game'],
  openGraph: {
    title: 'Video Game Studio Clicker',
    description: 'Build your video game studio from the ground up',
    type: 'website'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

const Loading = () => (
  <div className="game-card text-center p-8">
    <div className="animate-pulse">Loading...</div>
  </div>
)

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-blue-900`}>
        <ErrorBoundary>
          <GameProvider>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
