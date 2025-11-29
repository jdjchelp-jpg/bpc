'use client'

import { useState, useEffect } from 'react'
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns'

export default function CountdownTimer({ targetDate, title, theme = 'default' }) {
    const [timeLeft, setTimeLeft] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const timer = setInterval(() => {
            const now = new Date()
            const target = new Date(targetDate)
            const diff = differenceInSeconds(target, now)

            if (diff <= 0) {
                clearInterval(timer)
                setTimeLeft(0)
            } else {
                setTimeLeft(diff)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    if (!isMounted || timeLeft === null) return null

    if (!isMounted || timeLeft === null) return null

    const duration = intervalToDuration({ start: 0, end: timeLeft * 1000 })

    const themeStyles = {
        default: {
            background: 'var(--surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)'
        },
        christmas: {
            background: 'linear-gradient(135deg, #166534, #dc2626)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)'
        },
        newyear: {
            background: 'linear-gradient(135deg, #0f172a, #3b82f6)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        sunny: {
            background: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
            color: '#1e293b',
            border: 'none'
        },
        snow: {
            background: 'linear-gradient(135deg, #e2e8f0, #f8fafc)',
            color: '#0f172a',
            border: '1px solid #cbd5e1'
        },
        rain: {
            background: 'linear-gradient(135deg, #334155, #475569)',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        storm: {
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            color: '#e0e7ff',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        cloudy: {
            background: 'linear-gradient(135deg, #64748b, #94a3b8)',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)'
        }
    }

    const currentTheme = themeStyles[theme] || themeStyles.default

    return (
        <div style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            ...currentTheme
        }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>{title}</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {duration.years > 0 && <TimeUnit value={duration.years} label="Years" />}
                {(duration.years > 0 || duration.months > 0) && <TimeUnit value={duration.months} label="Months" />}
                <TimeUnit value={duration.days || 0} label="Days" />
                <TimeUnit value={duration.hours || 0} label="Hours" />
                <TimeUnit value={duration.minutes || 0} label="Minutes" />
                <TimeUnit value={duration.seconds || 0} label="Seconds" />
            </div>
        </div>
    )
}

function TimeUnit({ value, label }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1' }}>
                {String(value).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </span>
        </div>
    )
}
