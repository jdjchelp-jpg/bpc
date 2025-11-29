'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { User, LogOut, Crown } from 'lucide-react'

export default function Header() {
    const { user, isPremium, signOut } = useAuth()

    return (
        <header style={{
            borderBottom: '1px solid var(--border)',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-light)', textDecoration: 'none' }}>
                    Blue Peak
                </Link>

                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/countdown" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Countdowns</Link>
                    <Link href="/weather" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Weather</Link>
                    <Link href="/calendar" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Calendar</Link>
                    <Link href="/tools" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Tools</Link>
                    <Link href="/pricing" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', transition: 'color 0.2s' }}>Pricing</Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {isPremium && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: '0.25rem 0.75rem',
                                    background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.75rem',
                                    fontWeight: '700'
                                }}>
                                    <Crown size={14} /> PREMIUM
                                </div>
                            )}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'white',
                                fontSize: '0.9rem'
                            }}>
                                <User size={18} />
                                {user.email}
                            </div>
                            <button
                                onClick={signOut}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="btn-primary"
                            style={{
                                padding: '0.5rem 1.5rem',
                                fontSize: '0.9rem',
                                textDecoration: 'none'
                            }}
                        >
                            Sign In
                        </Link>
                    )}

                    <Link href="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Settings</Link>
                </nav>
            </div>
        </header>
    )
}
