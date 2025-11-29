'use client'

import { useState, useEffect } from 'react'
import { format, startOfYear, eachMonthOfInterval, endOfYear } from 'date-fns'
import { getCalendarDays, getWeekDays } from '@/lib/calendar'
import { getCountries, getHolidays } from '@/lib/holidays'
import Image from 'next/image'

export default function PrintCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [country, setCountry] = useState('JM') // Default to Jamaica
    const [countries, setCountries] = useState({})
    const [events, setEvents] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setCountries(getCountries())

        // Get saved country from localStorage if available
        const savedCountry = localStorage.getItem('calendar-country')
        if (savedCountry) {
            setCountry(savedCountry)
        }
    }, [])

    useEffect(() => {
        if (country && mounted) {
            const holidays = getHolidays(country, currentDate.getFullYear())
            const holidayEvents = holidays.map(h => ({
                title: h.name,
                date: h.date,
                isHoliday: true
            }))
            setEvents(holidayEvents)
        }
    }, [country, currentDate, mounted])

    if (!mounted) return null

    const countryName = countries[country] || 'Jamaica'

    return (
        <div style={{
            background: 'white',
            color: 'black',
            minHeight: '100vh',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div className="no-print" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Country:</label>
                    <select
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value)
                            localStorage.setItem('calendar-country', e.target.value)
                        }}
                        style={{
                            padding: '0.5rem',
                            fontSize: '1rem',
                            marginRight: '2rem'
                        }}
                    >
                        {Object.entries(countries).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>

                    <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Year:</label>
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1))}
                        style={{
                            padding: '0.5rem 1rem',
                            marginRight: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        &lt; Prev
                    </button>
                    <span style={{
                        padding: '0.5rem 1rem',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        {format(currentDate, 'yyyy')}
                    </span>
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1))}
                        style={{
                            padding: '0.5rem 1rem',
                            marginLeft: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        Next &gt;
                    </button>
                </div>

                <button
                    onClick={() => window.print()}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Print Calendar
                </button>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                    Use landscape mode for best results.
                </p>
            </div>

            {/* Header with Logo and Title */}
            <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                    <Image src="/BPC.png" alt="BPC Logo" width={80} height={80} style={{ objectFit: 'contain' }} />
                    <div>
                        <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>
                            Calendar for Year {format(currentDate, 'yyyy')} ({countryName})
                        </h1>
                    </div>
                </div>
            </div>

            {/* Yearly View - 3x4 Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {eachMonthOfInterval({
                    start: startOfYear(currentDate),
                    end: endOfYear(currentDate)
                }).map((monthDate, i) => {
                    const days = getCalendarDays(monthDate)
                    const weekDays = getWeekDays()

                    return (
                        <div key={i} style={{
                            border: '1px solid #ccc',
                            padding: '0.5rem'
                        }}>
                            <h3 style={{
                                textAlign: 'center',
                                margin: '0 0 0.5rem 0',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}>{format(monthDate, 'MMMM')}</h3>

                            {/* Week day headers */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                borderTop: '1px solid #000',
                                borderLeft: '1px solid #000'
                            }}>
                                {weekDays.map(day => (
                                    <div key={day} style={{
                                        padding: '2px',
                                        textAlign: 'center',
                                        fontSize: '0.6rem',
                                        fontWeight: 'bold',
                                        borderRight: '1px solid #000',
                                        borderBottom: '1px solid #000',
                                        background: '#f0f0f0'
                                    }}>
                                        {day.substring(0, 1)}
                                    </div>
                                ))}

                                {/* Calendar days */}
                                {days.map((day, idx) => {
                                    const dayStr = format(day, 'yyyy-MM-dd')
                                    const hasEvent = events.some(e => e.date.startsWith(dayStr))

                                    return (
                                        <div key={idx} style={{
                                            minHeight: '30px',
                                            padding: '2px',
                                            borderRight: '1px solid #000',
                                            borderBottom: '1px solid #000',
                                            fontSize: '0.7rem',
                                            background: hasEvent ? '#ffe6e6' : 'white',
                                            position: 'relative'
                                        }}>
                                            <span style={{ fontWeight: hasEvent ? 'bold' : 'normal' }}>
                                                {format(day, 'd')}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Holiday Legend */}
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                border: '1px solid #ccc',
                fontSize: '0.8rem'
            }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Holidays for {countryName}:</h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem'
                }}>
                    {events.slice(0, 12).map((event, i) => (
                        <div key={i}>
                            <strong>{format(new Date(event.date), 'MMM d')}:</strong> {event.title}
                        </div>
                    ))}
                </div>
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
                    @page {
                        size: landscape;
                        margin: 0.5cm;
                    }
                }
            `}</style>
        </div>
    )
}
