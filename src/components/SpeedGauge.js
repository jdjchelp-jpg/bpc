'use client'

export default function SpeedGauge({ value, max = 200, label, active }) {
    // Simple SVG Gauge
    const radius = 80
    const stroke = 10
    const normalizedValue = Math.min(Math.max(value, 0), max)
    const circumference = normalizedValue / max * 180 // 180 degree arc

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '200px', height: '120px', overflow: 'hidden' }}>
                <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
                    {/* Background Arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                    />
                    {/* Progress Arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray="251.2" // Pi * 80
                        strokeDashoffset={251.2 - (251.2 * (normalizedValue / max))}
                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                    />
                </svg>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1' }}>
                        {Math.round(value)}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mbps</div>
                </div>
            </div>
            <div style={{ marginTop: '0.5rem', fontWeight: '600', color: active ? 'var(--primary-light)' : 'var(--text-muted)' }}>
                {label}
            </div>
        </div>
    )
}
