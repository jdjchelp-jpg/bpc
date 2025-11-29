'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PremiumGuard({ children }) {
    const { user, isPremium, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isPremium) {
            router.push('/pricing')
        }
    }, [user, isPremium, loading, router])

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
            }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                    Loading...
                </div>
            </div>
        )
    }

    if (!isPremium) {
        return null
    }

    return <>{children}</>
}
