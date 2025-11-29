import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <SettingsProvider>
                        <ToastProvider>
                            <Header />
                            {children}
                        </ToastProvider>
                    </SettingsProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
