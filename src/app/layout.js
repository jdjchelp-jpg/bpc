import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { SettingsProvider } from '@/context/SettingsContext'
import { ToastProvider } from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Blue Peak Countdown',
    description: 'The ultimate time and utility application.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SettingsProvider>
                    <ToastProvider>
                        <Header />
                        <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '2rem' }}>
                            {children}
                        </main>
                    </ToastProvider>
                </SettingsProvider>
            </body>
        </html>
    )
}
