'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PrintWorksheetPage() {
    const [data, setData] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('worksheetData')
        if (saved) {
            setData(JSON.parse(saved))
        }
    }, [])

    if (!mounted) return null
    if (!data) return <div className="p-8">Loading...</div>

    const isMultiplication = data.type.includes('multiplication')

    return (
        <div style={{ background: 'white', color: 'black', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
            <style jsx global>{`
                @media print {
                    @page { margin: 0.5cm; }
                    body { -webkit-print-color-adjust: exact; }
                    .no-print { display: none !important; }
                }
                .worksheet-grid {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                }
                .worksheet-grid th, .worksheet-grid td {
                    border: 1px solid #000;
                    padding: 4px;
                    text-align: center;
                }
                .worksheet-grid th {
                    background: #000;
                    color: white;
                    font-weight: bold;
                }
                .worksheet-grid tr:nth-child(even) {
                    background: #f0f0f0;
                }
                .worksheet-grid tr:nth-child(odd) {
                    background: #fff;
                }
                /* First column styling */
                .worksheet-grid td:first-child {
                    background: #000;
                    color: white;
                    font-weight: bold;
                }
            `}</style>

            <div className="no-print" style={{ marginBottom: '2rem' }}>
                <Link href="/tools/worksheets" style={{ marginRight: '1rem', textDecoration: 'underline' }}>&larr; Back</Link>
                <button onClick={() => window.print()} style={{ padding: '0.5rem 1rem', background: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>Print</button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                    {data.title.replace('MULTIPLICATION', 'MULTIPLICATION CHART')}
                </h1>
            </div>

            {isMultiplication ? (
                <table className="worksheet-grid">
                    <thead>
                        <tr>
                            <th style={{ background: '#000' }}>X</th>
                            {data.data[0].map((_, i) => (
                                <th key={i}>{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((row, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {row.map((cell, j) => (
                                    <td key={j}>{cell.result}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : data.type === 'squares' ? (
                <table className="worksheet-grid" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Square</th>
                            <th>Cube</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((row) => (
                            <tr key={row.number}>
                                <td>{row.number}</td>
                                <td>{row.square}</td>
                                <td>{row.cube}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                    {data.data.map((item, i) => (
                        <div key={i} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0', fontSize: '1.2rem' }}>
                            {item.expression ? (
                                <span>{item.id + 1}. {item.expression}</span>
                            ) : (
                                <span>{item}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                BPC <span style={{ fontFamily: 'cursive', color: '#d946ef' }}>BCC</span>
            </div>
        </div>
    )
}
