import Link from 'next/link'

export default function Header() {
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

                <nav style={{ display: 'flex', gap: '2rem' }}>
                    <Link href="/countdown" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Countdowns</Link>
                    <Link href="/weather" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Weather</Link>
                    <Link href="/calendar" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Calendar</Link>
                    <Link href="/tools" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Tools</Link>
                    <Link href="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>Settings</Link>
                </nav>
            </div>
        </header>
    )
}
