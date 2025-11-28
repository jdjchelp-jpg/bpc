'use client'

import { useState, useEffect } from 'react'
import { addMonths, subMonths, format, startOfYear, eachMonthOfInterval, endOfYear } from 'date-fns'
import { getCalendarDays, getWeekDays } from '@/lib/calendar'
import CalendarGrid from '@/components/CalendarGrid'
import { ChevronLeft, ChevronRight, Printer, Calendar as CalendarIcon, Grid } from 'lucide-react'
import Link from 'next/link'
import { getCountries, getHolidays } from '@/lib/holidays'

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState('month') // 'month' or 'year'
    const [events, setEvents] = useState([])
    const [mounted, setMounted] = useState(false)
    const [country, setCountry] = useState('US')
    const [countries, setCountries] = useState({})

    useEffect(() => {
        setMounted(true)
        setCountries(getCountries())
        const savedEvents = localStorage.getItem('calendar-events')
        if (savedEvents) {
            try {
                setEvents(JSON.parse(savedEvents))
            } catch (e) {
                console.error('Failed to parse events', e)
            }
        }
    }, [])

    useEffect(() => {
        if (country) {
            const holidays = getHolidays(country, currentDate.getFullYear())
            // Convert holidays to event format
            const holidayEvents = holidays.map(h => ({
                title: h.name,
                date: h.date,
                color: 'var(--accent)', // Different color for holidays
                isHoliday: true
            }))

            setEvents(prev => {
                const userEvents = prev.filter(e => !e.isHoliday)
                return [...userEvents, ...holidayEvents]
            })
        }
    }, [country, currentDate]) // Re-fetch when country or year changes

    const saveEvents = (newEvents) => {
        setEvents(newEvents)
        localStorage.setItem('calendar-events', JSON.stringify(newEvents.filter(e => !e.isHoliday)))
    }

    const next = () => {
        if (view === 'month') setCurrentDate(addMonths(currentDate, 1))
        else setCurrentDate(addMonths(currentDate, 12))
    }

    const prev = () => {
        if (view === 'month') setCurrentDate(subMonths(currentDate, 1))
        else setCurrentDate(subMonths(currentDate, 12))
    }

    const today = () => setCurrentDate(new Date())

    const handleDateClick = (date) => {
        const title = prompt(`Add event for ${format(date, 'MMM d, yyyy')}:`)
        if (title) {
            const newEvent = {
                title,
                date: date.toISOString(),
                color: 'var(--primary)'
            }
            saveEvents([...events, newEvent])
        }
    }

    if (!mounted) return null

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="heading-lg">Calendar</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Organize your schedule.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            color: 'white',
                            border: '1px solid var(--border)',
                            maxWidth: '150px'
                        }}
                    >
                        {Object.entries(countries).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>

                    <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '0.25rem', border: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setView('month')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: view === 'month' ? 'var(--primary)' : 'transparent',
                                color: view === 'month' ? 'white' : 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            <CalendarIcon size={16} /> Month
                        </button>
                        <button
                            onClick={() => setView('year')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: view === 'year' ? 'var(--primary)' : 'transparent',
                                color: view === 'year' ? 'white' : 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            <Grid size={16} /> Year
                        </button>
                    </div>

                    <Link href="/calendar/print" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <Printer size={18} /> Print
                    </Link>
                    <button className="btn-primary" onClick={today}>Today</button>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        {view === 'month' ? format(currentDate, 'MMMM yyyy') : format(currentDate, 'yyyy')}
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={prev} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-hover)', color: 'white' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={next} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-hover)', color: 'white' }}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {view === 'month' ? (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.5rem', textAlign: 'center' }}>
                            {getWeekDays().map(day => (
                                <div key={day} style={{ fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0.5rem' }}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <CalendarGrid
                            days={getCalendarDays(currentDate)}
                            currentMonth={currentDate}
                            events={events}
                            onDateClick={handleDateClick}
                        />
                    </>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {eachMonthOfInterval({
                            start: startOfYear(currentDate),
                            end: endOfYear(currentDate)
                        }).map((monthDate, i) => (
                            <div key={i} style={{
                                border: 'none',
                                padding: '0',
                                background: 'transparent'
                            }}>
                                <h3 style={{
                                    textAlign: 'center',
                                    marginBottom: '0.5rem',
                                    fontWeight: '700',
                                    fontSize: '1.1rem'
                                }}>{format(monthDate, 'MMMM')}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.25rem', textAlign: 'center' }}>
                                    {getWeekDays().map(day => (
                                        <div key={day} style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{day.substring(0, 1)}</div>
                                    ))}
                                </div>
                                <CalendarGrid
                                    days={getCalendarDays(monthDate)}
                                    currentMonth={monthDate}
                                    events={events}
                                    isSmall={true}
                                    onDateClick={handleDateClick}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>Click any date to add an event. Events are saved locally.</p>
            </div>
        </div>
    )
}
