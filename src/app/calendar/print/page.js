'use client'

import { useState, useEffect } from 'react'
import { addMonths, subMonths, format } from 'date-fns'
import { getCalendarDays, getWeekDays } from '@/lib/calendar'

export default function PrintCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date())

    // Ensure client-side rendering for date consistency
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const days = getCalendarDays(currentDate)
    const weekDays = getWeekDays()

    return (
        <div style={{
            background: 'white',
            color: 'black',
            minHeight: '100vh',
            padding: '2rem',
            fontFamily: 'serif'
        }}>
            <div className="no-print" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <button
                    onClick={() => window.print()}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}
                >
                    Print Calendar
                </button>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                    Use landscape mode for best results.
                </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '3rem', margin: 0 }}>{format(currentDate, 'MMMM yyyy')}</h1>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }} className="no-print">
                    <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>&lt; Prev</button>
                    <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Next &gt;</button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderTop: '1px solid #000',
                borderLeft: '1px solid #000'
            }}>
                {weekDays.map(day => (
                    <div key={day} style={{
                        padding: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderRight: '1px solid #000',
                        borderBottom: '1px solid #000',
                        background: '#f0f0f0'
                    }}>
                        {day}
                    </div>
                ))}

                {days.map((day, idx) => (
                    <div key={idx} style={{
                        height: '120px',
                        padding: '0.5rem',
                        borderRight: '1px solid #000',
                        borderBottom: '1px solid #000',
                        position: 'relative'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{format(day, 'd')}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem' }}>
                <p>Blue Peak Countdown Calendar</p>
            </div>

            <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
            color: black;
          }
        }
      `}</style>
        </div>
    )
}
