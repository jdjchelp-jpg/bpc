'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateMultiplicationTable, generatePrimes, generateSquaresAndCubes, generateMathProblems } from '@/lib/worksheets'

export default function WorksheetsPage() {
    const [type, setType] = useState('multiplication')
    const [limit, setLimit] = useState(12)
    const [generatedData, setGeneratedData] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleGenerate = () => {
        let data
        if (type === 'multiplication') {
            data = generateMultiplicationTable(limit)
        } else if (type === 'multiplication-40') {
            data = generateMultiplicationTable(40)
        } else if (type === 'multiplication-50') {
            data = generateMultiplicationTable(50)
        } else if (type === 'primes') {
            data = generatePrimes(limit)
        } else if (type === 'squares') {
            data = generateSquaresAndCubes(limit)
        } else if (type === 'problems') {
            data = generateMathProblems(20, 'medium')
        }
        setGeneratedData(data)
    }

    const handlePrintPreview = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('worksheetData', JSON.stringify({ type, data: generatedData, title: type.toUpperCase() }))
        }
    }

    if (!mounted) return null

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <h1 className="heading-lg">Worksheet Generator</h1>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'white', border: '1px solid var(--border)' }}
                    >
                        <option value="multiplication">Custom Multiplication</option>
                        <option value="multiplication-40">Multiplication 1-40</option>
                        <option value="multiplication-50">Multiplication 1-50</option>
                        <option value="primes">Prime Numbers</option>
                        <option value="squares">Squares & Cubes</option>
                        <option value="problems">Math Problems</option>
                    </select>

                    <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value ? parseInt(e.target.value) : '')}
                        placeholder="Limit (e.g. 100)"
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'white', border: '1px solid var(--border)', width: '120px' }}
                    />

                    <button onClick={handleGenerate} className="btn-primary">Generate</button>
                </div>

                {generatedData && (
                    <div>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <Link
                                href="/tools/worksheets/print"
                                onClick={handlePrintPreview}
                                className="btn-primary"
                                style={{ background: 'var(--secondary)', textDecoration: 'none' }}
                            >
                                Print Preview
                            </Link>
                        </div>

                        <div style={{ maxHeight: '400px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(generatedData, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
