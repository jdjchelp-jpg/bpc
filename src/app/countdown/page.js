'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import { getUpcomingHolidays } from '@/lib/holidays'

export default function CountdownDashboard() {
    const [holidays, setHolidays] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Default to US for now, could be dynamic based on user selection
        const upcoming = getUpcomingHolidays('US', 6)
        setHolidays(upcoming)
        setLoading(false)
    }, [])

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="heading-lg">Smart Countdowns</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your most anticipated moments.</p>
                </div>
                <Link href="/countdown/create" className="btn-primary">
                    + Create New
                </Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading holidays...</div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                    {holidays.map((holiday, index) => (
                        <CountdownTimer
                            key={index}
                            title={holiday.name}
                            targetDate={holiday.date}
                            theme={holiday.name.toLowerCase().includes('christmas') ? 'christmas' : holiday.name.toLowerCase().includes('new year') ? 'newyear' : 'default'}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
