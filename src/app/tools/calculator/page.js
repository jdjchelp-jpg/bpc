'use client'

import { useState } from 'react'
import Calculator from '@/components/Calculator'
import { unitConversions, convertUnit, toRoman, fromRoman } from '@/lib/calculator'

export default function CalculatorPage() {
    const [mode, setMode] = useState('basic') // basic, converter, roman

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>Calculator Suite</h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                {['basic', 'converter', 'roman'].map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: mode === m ? 'var(--primary)' : 'var(--surface)',
                            color: 'white',
                            textTransform: 'capitalize',
                            fontWeight: '600'
                        }}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {mode === 'basic' && <Calculator />}

            {mode === 'converter' && <UnitConverter />}

            {mode === 'roman' && <RomanConverter />}
        </div>
    )
}

function UnitConverter() {
    const [category, setCategory] = useState('length')
    const [value, setValue] = useState('')
    const [from, setFrom] = useState(unitConversions.length[0].value)
    const [to, setTo] = useState(unitConversions.length[1].value)
    const [result, setResult] = useState('')

    const handleConvert = () => {
        if (!value) return
        const res = convertUnit(value, from, to)
        setResult(res)
    }

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                        setFrom(unitConversions[e.target.value][0].value)
                        setTo(unitConversions[e.target.value][1].value)
                    }}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--background)', color: 'white', border: '1px solid var(--border)' }}
                >
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>From</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Value"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--background)', color: 'white', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                    />
                    <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--background)', color: 'white', border: '1px solid var(--border)' }}
                    >
                        {unitConversions[category].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>To</label>
                    <div style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', color: 'var(--primary-light)', border: '1px solid var(--border)', marginBottom: '0.5rem', minHeight: '42px' }}>
                        {result || '-'}
                    </div>
                    <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--background)', color: 'white', border: '1px solid var(--border)' }}
                    >
                        {unitConversions[category].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                    </select>
                </div>
            </div>

            <button onClick={handleConvert} className="btn-primary" style={{ width: '100%' }}>Convert</button>
        </div>
    )
}

function RomanConverter() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')
    const [mode, setMode] = useState('toRoman') // toRoman, fromRoman

    const handleConvert = () => {
        if (!input) return
        if (mode === 'toRoman') {
            setResult(toRoman(parseInt(input)))
        } else {
            setResult(fromRoman(input.toUpperCase()))
        }
    }

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setMode('toRoman')}
                    style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', background: mode === 'toRoman' ? 'var(--surface-hover)' : 'transparent', color: 'white', border: '1px solid var(--border)' }}
                >
                    Number → Roman
                </button>
                <button
                    onClick={() => setMode('fromRoman')}
                    style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', background: mode === 'fromRoman' ? 'var(--surface-hover)' : 'transparent', color: 'white', border: '1px solid var(--border)' }}
                >
                    Roman → Number
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'toRoman' ? "Enter number (e.g. 2024)" : "Enter Roman (e.g. MMXXIV)"}
                    style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--background)', color: 'white', border: '1px solid var(--border)', textAlign: 'center' }}
                />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Result</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-light)' }}>{result || '-'}</div>
            </div>

            <button onClick={handleConvert} className="btn-primary" style={{ width: '100%' }}>Convert</button>
        </div>
    )
}
