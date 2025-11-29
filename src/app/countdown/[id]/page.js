'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CountdownTimer from '@/components/CountdownTimer'

export default function SharedCountdown() {
    const { id } = useParams()
    const [countdown, setCountdown] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCountdown() {
            if (!supabase) {
                setError('Database connection failed')
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('countdowns')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setCountdown(data)
            } catch (err) {
                console.error('Error fetching countdown:', err)
                setError('Countdown not found')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchCountdown()
        }
    }, [id])

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>
    if (error) return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: 'var(--accent)' }}>{error}</div>
    if (!countdown) return null

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '800px' }}>
                <CountdownTimer
                    title={countdown.title}
                    targetDate={countdown.target_date}
                    theme={countdown.theme}
                />

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Share this countdown:</p>
                    <div className="glass-panel" style={{ padding: '1rem', display: 'inline-block', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        {typeof window !== 'undefined' ? window.location.href : ''}
                    </div>

                    <div style={{ textAlign: 'left', maxWidth: '100%' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Embed on your site:</p>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                readOnly
                                value={`<iframe src="${typeof window !== 'undefined' ? window.location.href : ''}" width="100%" height="400" frameborder="0"></iframe>`}
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-muted)',
                                    fontFamily: 'monospace',
                                    fontSize: '0.8rem',
                                    resize: 'none'
                                }}
                            />
                            <button
                                onClick={() => {
                                    const code = `<iframe src="${window.location.href}" width="100%" height="400" frameborder="0"></iframe>`
                                    navigator.clipboard.writeText(code)
                                    alert('Embed code copied!')
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    padding: '0.25rem 0.5rem',
                                    fontSize: '0.7rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer'
                                }}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
