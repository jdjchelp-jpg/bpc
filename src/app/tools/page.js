import Link from 'next/link'
import { Calculator, Calendar, CloudRain, Timer, Activity, Globe } from 'lucide-react'

export default function ToolsPage() {
    const tools = [
        { name: 'Calculator Suite', icon: <Calculator size={32} />, href: '/tools/calculator', desc: 'Scientific, Unit Converter, Roman Numerals' },
        { name: 'Smart Countdowns', icon: <Timer size={32} />, href: '/countdown', desc: 'Track events with style' },
        { name: 'Weather Dashboard', icon: <CloudRain size={32} />, href: '/weather', desc: 'Global forecasts & themes' },
        { name: 'Calendar System', icon: <Calendar size={32} />, href: '/calendar', desc: 'Monthly, Yearly, & Moon Phases' },
        { name: 'Worksheet Generator', icon: <Calculator size={32} />, href: '/tools/worksheets', desc: 'Math tables & problems' },
        { name: 'Speed Test', icon: <Activity size={32} />, href: '/tools/speedtest', desc: 'Check internet performance' },
        { name: 'Meeting Planner', icon: <Globe size={32} />, href: '/tools/meeting', desc: 'Coordinate across timezones' },
    ]

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Power Tools</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {tools.map((tool, i) => (
                    <Link key={i} href={tool.href} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ marginBottom: '1.5rem', color: 'var(--primary-light)' }}>
                            {tool.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>{tool.name}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
