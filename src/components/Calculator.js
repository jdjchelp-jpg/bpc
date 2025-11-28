'use client'

import { useState } from 'react'
import { calculate } from '@/lib/calculator'

export default function Calculator() {
    const [display, setDisplay] = useState('')
    const [result, setResult] = useState('')

    const handleInput = (val) => {
        setDisplay(prev => prev + val)
    }

    const handleClear = () => {
        setDisplay('')
        setResult('')
    }

    const handleBackspace = () => {
        setDisplay(prev => prev.slice(0, -1))
    }

    const handleCalculate = () => {
        if (!display) return
        const res = calculate(display)
        setResult(res)
    }

    const buttons = [
        'C', '(', ')', '÷',
        '7', '8', '9', '×',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '⌫', '='
    ]

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                textAlign: 'right'
            }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', minHeight: '1.5rem' }}>{display || '0'}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginTop: '0.5rem' }}>{result || (display ? '' : '0')}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                {buttons.map(btn => (
                    <button
                        key={btn}
                        onClick={() => {
                            if (btn === 'C') handleClear()
                            else if (btn === '⌫') handleBackspace()
                            else if (btn === '=') handleCalculate()
                            else handleInput(btn)
                        }}
                        style={{
                            padding: '1rem',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            borderRadius: 'var(--radius-md)',
                            background: btn === '=' ? 'var(--primary)' :
                                ['C', '⌫'].includes(btn) ? 'var(--accent)' :
                                    ['÷', '×', '-', '+'].includes(btn) ? 'var(--surface-hover)' : 'rgba(255,255,255,0.05)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    )
}
