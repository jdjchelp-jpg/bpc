'use client'

import { format, isSameMonth, isToday, isSameDay } from 'date-fns'
import { getMoonPhase } from '@/lib/calendar'

export default function CalendarGrid({ days, currentMonth, events = [], onDateClick, isSmall = false }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
            background: isSmall ? 'transparent' : 'var(--border)',
            border: isSmall ? 'none' : '1px solid var(--border)',
            borderRadius: isSmall ? '0' : 'var(--radius-lg)',
            overflow: 'hidden'
        }}>
            {days.map((day, idx) => {
                const moon = getMoonPhase(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isCurrentDay = isToday(day)
                const dayEvents = events.filter(e => isSameDay(new Date(e.date), day))

                return (
                    <div
                        key={idx}
                        onClick={() => onDateClick && onDateClick(day)}
                        style={{
                            minHeight: isSmall ? 'auto' : '120px',
                            aspectRatio: isSmall ? '1/1' : 'auto',
                            background: isCurrentMonth ? (isSmall ? 'transparent' : 'var(--surface)') : (isSmall ? 'transparent' : 'rgba(30, 41, 59, 0.4)'),
                            padding: isSmall ? '0.25rem' : '0.5rem',
                            color: isCurrentMonth ? 'var(--text-main)' : 'var(--text-muted)',
                            position: 'relative',
                            cursor: onDateClick ? 'pointer' : 'default',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: isSmall ? 'center' : 'flex-start',
                            opacity: !isCurrentMonth && isSmall ? 0 : 1
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: isSmall ? 'center' : 'space-between', width: '100%', alignItems: 'flex-start' }}>
                            <span style={{
                                fontWeight: isCurrentDay ? '700' : '400',
                                color: isCurrentDay ? 'var(--primary-light)' : 'inherit',
                                background: isCurrentDay ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                padding: isSmall ? '0.1rem' : '0.25rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: isSmall ? '0.8rem' : '1rem',
                                width: isSmall ? '24px' : 'auto',
                                height: isSmall ? '24px' : 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {format(day, 'd')}
                            </span>
                            {!isSmall && (
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }} title={moon.phase}>
                                    {moon.emoji}
                                </span>
                            )}
                        </div>

                        {!isSmall ? (
                            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
                                {dayEvents.map((event, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            fontSize: '0.75rem',
                                            padding: '0.125rem 0.25rem',
                                            borderRadius: 'var(--radius-sm)',
                                            background: event.color || 'var(--primary)',
                                            color: 'white',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                                {dayEvents.map((_, i) => (
                                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }} />
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
