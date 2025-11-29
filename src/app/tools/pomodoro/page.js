'use client'

import { useState, useEffect, useRef } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Play, Pause, RotateCcw, CheckCircle, Plus, Trash2, Volume2, VolumeX, Timer } from 'lucide-react'

export default function PomodoroPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('work') // work, shortBreak, longBreak
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [cycles, setCycles] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => {
        const savedTasks = localStorage.getItem('pomodoro-tasks')
        if (savedTasks) setTasks(JSON.parse(savedTasks))
    }, [])

    useEffect(() => {
        localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            handleTimerComplete()
        }

        return () => clearInterval(timerRef.current)
    }, [isActive, timeLeft])

    const handleTimerComplete = () => {
        setIsActive(false)
        if (soundEnabled) {
            const audio = new Audio('/notification.mp3') // Placeholder
            audio.play().catch(e => console.log('Audio play failed', e))
        }

        if (mode === 'work') {
            setCycles(c => c + 1)
            if ((cycles + 1) % 4 === 0) {
                switchMode('longBreak')
            } else {
                switchMode('shortBreak')
            }
        } else {
            switchMode('work')
        }
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setIsActive(false)
        if (newMode === 'work') setTimeLeft(25 * 60)
        if (newMode === 'shortBreak') setTimeLeft(5 * 60)
        if (newMode === 'longBreak') setTimeLeft(15 * 60)
    }

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        if (mode === 'work') setTimeLeft(25 * 60)
        if (mode === 'shortBreak') setTimeLeft(5 * 60)
        if (mode === 'longBreak') setTimeLeft(15 * 60)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const addTask = (e) => {
        e.preventDefault()
        if (!newTask.trim()) return
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
        setNewTask('')
    }

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <Timer style={{ color: 'var(--accent)' }} /> Focus Timer
                </h1>

                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        {[
                            { id: 'work', label: 'Work' },
                            { id: 'shortBreak', label: 'Short Break' },
                            { id: 'longBreak', label: 'Long Break' }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => switchMode(m.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: mode === m.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ fontSize: '6rem', fontWeight: '900', fontFamily: 'monospace', marginBottom: '2rem', color: mode === 'work' ? 'var(--accent)' : 'var(--primary-light)' }}>
                        {formatTime(timeLeft)}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                        <button
                            onClick={toggleTimer}
                            className="btn-primary"
                            style={{ padding: '1rem 3rem', fontSize: '1.5rem' }}
                        >
                            {isActive ? <Pause size={32} /> : <Play size={32} />}
                        </button>
                        <button
                            onClick={resetTimer}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <RotateCcw size={24} />
                        </button>
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        </button>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Tasks</h3>

                    <form onSubmit={addTask} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="What are you working on?"
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border)',
                                color: 'white'
                            }}
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>
                            <Plus size={20} />
                        </button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {tasks.map(task => (
                            <div key={task.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-md)',
                                opacity: task.completed ? 0.5 : 1
                            }}>
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: task.completed ? 'var(--accent)' : 'var(--text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <CheckCircle size={24} />
                                </button>
                                <span style={{
                                    flex: 1,
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    fontSize: '1.1rem'
                                }}>
                                    {task.text}
                                </span>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        {tasks.length === 0 && (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                                No tasks yet. Add one to get started!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </PremiumGuard>
    )
}
