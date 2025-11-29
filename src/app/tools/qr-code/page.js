'use client'

import { useState, useRef } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { QrCode, Download, Link as LinkIcon, Type, Wifi } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

export default function QRCodePage() {
    const [text, setText] = useState('https://bluepeak.app')
    const [type, setType] = useState('url') // url, text, wifi
    const [size, setSize] = useState(256)
    const [fgColor, setFgColor] = useState('#000000')
    const [bgColor, setBgColor] = useState('#ffffff')
    const qrRef = useRef(null)

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas')
        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = url
        a.download = 'qrcode.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <QrCode style={{ color: 'var(--accent)' }} /> QR Code Generator
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Controls */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {[
                                { id: 'url', label: 'URL', icon: <LinkIcon size={16} /> },
                                { id: 'text', label: 'Text', icon: <Type size={16} /> },
                                { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={16} /> }
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setType(t.id)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: type === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {t.icon} {t.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Content</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={type === 'url' ? 'https://example.com' : 'Enter text here...'}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--border)',
                                    color: 'white',
                                    minHeight: '100px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Foreground</label>
                                <input
                                    type="color"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    style={{ width: '100%', height: '40px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Background</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    style={{ width: '100%', height: '40px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Size: {size}px</label>
                            <input
                                type="range"
                                min="128"
                                max="512"
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div
                            ref={qrRef}
                            style={{
                                padding: '1rem',
                                background: 'white',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '2rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <QRCodeCanvas
                                value={text}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level="H"
                                includeMargin={true}
                            />
                        </div>

                        <button
                            onClick={downloadQR}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Download size={20} /> Download PNG
                        </button>
                    </div>
                </div>
            </div>
        </PremiumGuard>
    )
}
