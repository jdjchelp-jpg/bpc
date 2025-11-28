export default function Home() {
    return (
        <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
            <h1 className="heading-xl">Blue Peak Countdown</h1>
            <p className="heading-lg" style={{ color: 'var(--text-muted)' }}>
                The ultimate time and utility platform.
            </p>

            <div style={{ marginTop: '3rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3>Smart Countdowns</h3>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Track upcoming events with style.</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3>Weather Integration</h3>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Real-time updates for any location.</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3>Calendar System</h3>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Organize your time effectively.</p>
                </div>
            </div>
        </div>
    )
}
