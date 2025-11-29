'use client'

import { useState, useEffect } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Check, Plus, Trash2, Activity, Calendar, Trophy } from 'lucide-react'
import { format, startOfWeek, addDays, isSameDay, subDays } from 'date-fns'

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState([])
    const [newHabit, setNewHabit] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        const savedHabits = localStorage.getItem('habit-tracker-data')
        if (savedHabits) setHabits(JSON.parse(savedHabits))
    }, [])

    useEffect(() => {
        localStorage.setItem('habit-tracker-data', JSON.stringify(habits))
    }, [habits])

    const addHabit = (e) => {
        e.preventDefault()
        if (!newHabit.trim()) return
        setHabits([...habits, {
            id: Date.now(),
            name: newHabit,
            completedDates: [],
            streak: 0
        }])
        setNewHabit('')
    }

    const toggleHabit = (habitId, date) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const isCompleted = habit.completedDates.includes(dateStr)
                let newCompletedDates
                if (isCompleted) {
                    newCompletedDates = habit.completedDates.filter(d => d !== dateStr)
                } else {
                    newCompletedDates = [...habit.completedDates, dateStr]
                }

                // Recalculate streak
                let streak = 0
                let current = new Date()
                while (newCompletedDates.includes(format(current, 'yyyy-MM-dd'))) {
                    streak++
                    current = subDays(current, 1)
                }

                return { ...habit, completedDates: newCompletedDates, streak }
            }
            return habit
        }))
    }

    const deleteHabit = (id) => {
        if (confirm('Are you sure you want to delete this habit?')) {
            setHabits(habits.filter(h => h.id !== id))
        }
    }

    const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const start = startOfWeek(new Date(), { weekStartsOn: 1 })
        return addDays(start, i)
    })

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <Activity style={{ color: 'var(--accent)' }} /> Habit Tracker
                </h1>

                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <form onSubmit={addHabit} style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            placeholder="Add a new habit (e.g., Read 30 mins, Drink water)"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border)',
                                color: 'white',
                                fontSize: '1.1rem'
                            }}
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '0 2rem' }}>
                            <Plus size={24} />
                        </button>
                    </form>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {habits.map(habit => (
                        <div key={habit.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{habit.name}</h3>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'rgba(255,165,0,0.2)',
                                        color: 'orange',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.8rem'
                                    }}>
                                        <Trophy size={14} /> {habit.streak} day streak
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                                {weekDays.map((day, i) => {
                                    const dateStr = format(day, 'yyyy-MM-dd')
                                    const isCompleted = habit.completedDates.includes(dateStr)
                                    const isToday = isSameDay(day, new Date())

                                    return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{format(day, 'EEE')}</span>
                                            <button
                                                onClick={() => toggleHabit(habit.id, day)}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    border: isToday ? '2px solid var(--primary)' : '1px solid var(--border)',
                                                    background: isCompleted ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {isCompleted && <Check size={20} />}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {habits.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>No habits tracked yet. Start building your routine!</p>
                        </div>
                    )}
                </div>
            </div>
        </PremiumGuard>
    )
}
