'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error: authError } = isSignUp
            ? await signUp(email, password)
            : await signIn(email, password)

        if (authError) {
            setError(authError.message)
            setLoading(false)
        } else {
            router.push('/')
        }
    }

    return (
        <div className="container" style={{
            padding: '4rem 1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <div className="glass-panel" style={{
                padding: '3rem',
                maxWidth: '450px',
                width: '100%'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                </h1>

                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgb(239, 68, 68)',
                        borderRadius: 'var(--radius-md)',
                        color: 'rgb(239, 68, 68)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'white'
                            }}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'white'
                            }}
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)'
                }}>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    {' '}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp)
                            setError(null)
                        }}
                        style={{
                            color: 'var(--primary)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>

                <Link
                    href="/"
                    style={{
                        display: 'block',
                        marginTop: '1rem',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                    }}
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
