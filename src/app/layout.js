import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { SettingsProvider } from '@/context/SettingsContext'
import { ToastProvider } from '@/components/ToastProvider'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Blue Peak Countdown',
    description: 'The ultimate time and utility application.',
}

import ErrorBoundary from '@/components/ErrorBoundary'

// ... imports

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ErrorBoundary>
                    <AuthProvider>
                        <SettingsProvider>
                            <ToastProvider>
                                <Header />
                                <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '2rem' }}>
                                    {children}
                                </main>
                            </ToastProvider>
                        </SettingsProvider>
                    </AuthProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
