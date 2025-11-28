'use client'

import { useState } from 'react'
import { runSpeedTest } from '@/lib/speedtest'
import SpeedGauge from '@/components/SpeedGauge'
import { Play, RotateCcw, Activity, Wifi } from 'lucide-react'

export default function SpeedTestPage() {
    const [status, setStatus] = useState('idle') // idle, running, complete
    const [data, setData] = useState({
        phase: '',
        speed: 0,
        ping: 0,
        jitter: 0
    })
    const [results, setResults] = useState(null)

    const startTest = async () => {
        setStatus('running')
        setResults(null)

        const finalResults = await runSpeedTest((progress) => {
            setData(progress)
        })

        setResults(finalResults)
        setStatus('complete')
        setData({ phase: '', speed: 0, ping: finalResults.ping, jitter: finalResults.jitter })
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Speed Test</h1>

            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <SpeedGauge
                        value={status === 'running' && data.phase === 'download' ? data.speed : results?.download || 0}
                        max={200}
                        label="DOWNLOAD"
                        active={data.phase === 'download'}
                    />
                    <SpeedGauge
                        value={status === 'running' && data.phase === 'upload' ? data.speed : results?.upload || 0}
                        max={100}
                        label="UPLOAD"
                        active={data.phase === 'upload'}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                            <Activity size={16} /> Ping
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{data.ping || results?.ping || '-'} <span style={{ fontSize: '0.9rem', fontWeight: '400' }}>ms</span></div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                            <Wifi size={16} /> Jitter
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{data.jitter || results?.jitter || '-'} <span style={{ fontSize: '0.9rem', fontWeight: '400' }}>ms</span></div>
                    </div>
                </div>

                {status !== 'running' && (
                    <button
                        onClick={startTest}
                        className="btn-primary"
                        style={{
                            fontSize: '1.2rem',
                            padding: '1rem 3rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            borderRadius: 'var(--radius-full)'
                        }}
                    >
                        {status === 'complete' ? <RotateCcw /> : <Play />}
                        {status === 'complete' ? 'Test Again' : 'Start Test'}
                    </button>
                )}

                {status === 'running' && (
                    <div style={{ fontSize: '1.2rem', color: 'var(--primary-light)', fontWeight: '600', animation: 'pulse 1.5s infinite' }}>
                        Testing {data.phase}...
                    </div>
                )}
            </div>
        </div>
    )
}
