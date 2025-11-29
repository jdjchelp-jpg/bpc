'use client'

import { useState } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PasswordGeneratorPage() {
    const [password, setPassword] = useState('')
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [copied, setCopied] = useState(false)

    const generatePassword = () => {
        let charset = ''
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
        if (includeNumbers) charset += '0123456789'
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

        if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz'

        let newPassword = ''
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            newPassword += charset[randomIndex]
        }

        setPassword(newPassword)
        setCopied(false)
    }

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const getPasswordStrength = () => {
        if (!password) return { text: '', color: '' }

        let strength = 0
        if (password.length >= 12) strength++
        if (password.length >= 16) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^a-zA-Z0-9]/.test(password)) strength++

        if (strength <= 2) return { text: 'Weak', color: '#ef4444' }
        if (strength <= 4) return { text: 'Medium', color: '#f59e0b' }
        return { text: 'Strong', color: '#10b981' }
    }

    const strength = getPasswordStrength()

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 className="heading-lg">Password Generator</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Generate secure, random passwords
                </p>

                <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                    {/* Password Display */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        position: 'relative',
                        fontFamily: 'monospace',
                        fontSize: '1.2rem',
                        wordBreak: 'break-all',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {password || 'Click generate to create a password'}

                        {password && (
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    padding: '0.5rem',
                                    background: copied ? 'var(--primary)' : 'var(--surface-hover)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied!' : ''}
                            </button>
                        )}
                    </div>

                    {/* Strength Indicator */}
                    {password && (
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                                Strength:
                            </span>
                            <span style={{ color: strength.color, fontWeight: 'bold' }}>
                                {strength.text}
                            </span>
                        </div>
                    )}

                    {/* Length Slider */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                            Password Length: {length}
                        </label>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    {/* Options */}
                    <div style={{ marginBottom: '2rem' }}>
                        {[
                            { label: 'Uppercase (A-Z)', value: includeUppercase, setter: setIncludeUppercase },
                            { label: 'Lowercase (a-z)', value: includeLowercase, setter: setIncludeLowercase },
                            { label: 'Numbers (0-9)', value: includeNumbers, setter: setIncludeNumbers },
                            { label: 'Symbols (!@#$%)', value: includeSymbols, setter: setIncludeSymbols }
                        ].map((option, i) => (
                            <label
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={option.value}
                                    onChange={(e) => option.setter(e.target.checked)}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generatePassword}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <RefreshCw size={20} />
                        Generate Password
                    </button>
                </div>
            </div>
        </PremiumGuard>
    )
}
