'use client'

import { useState, useEffect } from 'react'
import { format, addHours, startOfToday } from 'date-fns'
import { Plus, X, Clock, Globe } from 'lucide-react'

// Common timezones for demo
const timezones = [
    { city: 'New York', zone: 'America/New_York', offset: -5 },
    { city: 'London', zone: 'Europe/London', offset: 0 },
    { city: 'Paris', zone: 'Europe/Paris', offset: 1 },
    { city: 'Tokyo', zone: 'Asia/Tokyo', offset: 9 },
    { city: 'Sydney', zone: 'Australia/Sydney', offset: 11 },
    { city: 'San Francisco', zone: 'America/Los_Angeles', offset: -8 },
    { city: 'Dubai', zone: 'Asia/Dubai', offset: 4 },
]

export default function MeetingPlanner() {
    const [selectedZones, setSelectedZones] = useState([
        timezones[0], // NY
        timezones[1], // London
    ])
    const [baseTime, setBaseTime] = useState(12) // 12:00 PM
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const addZone = (zone) => {
        if (!selectedZones.find(z => z.city === zone.city)) {
            setSelectedZones([...selectedZones, zone])
        }
    }

    const removeZone = (city) => {
        setSelectedZones(selectedZones.filter(z => z.city !== city))
    }

    const getLocalTime = (offset) => {
        // Simple offset calculation for demo (ignoring DST complexity for now)
        let time = baseTime + offset
        if (time < 0) time += 24
        if (time >= 24) time -= 24
        return time
    }

    const formatTime = (hours) => {
        const h = Math.floor(hours)
        const m = Math.round((hours - h) * 60)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const displayH = h % 12 || 12
        return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`
    }

    const getStatus = (hours) => {
        if (hours >= 9 && hours <= 17) return 'working' // 9-5
        if (hours >= 7 && hours < 22) return 'awake' // 7am-10pm
        return 'sleeping'
    }

    if (!mounted) return null

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Meeting Planner</h1>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600' }}>Select Meeting Time (UTC)</label>
                    <input
                        type="range"
                        min="0"
                        max="23.75"
                        step="0.25"
                        value={baseTime}
                        onChange={(e) => setBaseTime(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>
                        {formatTime(baseTime)} UTC
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedZones.map(zone => {
                        const localTime = getLocalTime(zone.offset + (baseTime - 0)) // relative to UTC 0
                        // Actually, let's simplify: baseTime is UTC.
                        // localTime = (baseTime + zone.offset) % 24
                        let time = baseTime + zone.offset
                        if (time < 0) time += 24
                        if (time >= 24) time -= 24

                        const status = getStatus(time)

                        return (
                            <div key={zone.city} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-md)',
                                borderLeft: `4px solid ${status === 'working' ? '#22c55e' : status === 'awake' ? '#eab308' : '#64748b'}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Globe size={20} style={{ opacity: 0.5 }} />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{zone.city}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>UTC {zone.offset >= 0 ? '+' : ''}{zone.offset}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{formatTime(time)}</div>
                                        <div style={{ fontSize: '0.8rem', color: status === 'working' ? '#4ade80' : status === 'awake' ? '#fde047' : '#94a3b8' }}>
                                            {status === 'working' ? 'Business Hours' : status === 'awake' ? 'Awake' : 'Sleeping'}
                                        </div>
                                    </div>
                                    <button onClick={() => removeZone(zone.city)} style={{ opacity: 0.5, hover: { opacity: 1 } }}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Add City</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {timezones.filter(z => !selectedZones.find(s => s.city === z.city)).map(zone => (
                            <button
                                key={zone.city}
                                onClick={() => addZone(zone)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Plus size={14} /> {zone.city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
