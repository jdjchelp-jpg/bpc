import Link from 'next/link'
import { Calculator, Calendar, CloudRain, Timer, Activity, Globe, Key, Crown, Bot, Eye, FileText, QrCode, RefreshCw, Clock, BookOpen, Music, Zap, Bookmark, Coins, Palette, Terminal, Gamepad2, Sigma, Heart, User, Sun, Sunrise } from 'lucide-react'

export default function ToolsPage() {
    const tools = [
        { name: 'Calculator Suite', icon: <Calculator size={32} />, href: '/tools/calculator', desc: 'Scientific, Unit Converter, Roman Numerals' },
        { name: 'Smart Countdowns', icon: <Timer size={32} />, href: '/countdown', desc: 'Track events with style' },
        { name: 'Weather Dashboard', icon: <CloudRain size={32} />, href: '/weather', desc: 'Global forecasts & themes' },
        { name: 'Calendar System', icon: <Calendar size={32} />, href: '/calendar', desc: 'Monthly, Yearly, & Moon Phases' },
        { name: 'Worksheet Generator', icon: <Calculator size={32} />, href: '/tools/worksheets', desc: 'Math tables & problems' },
        { name: 'Speed Test', icon: <Activity size={32} />, href: '/tools/speedtest', desc: 'Check internet performance' },
        { name: 'Meeting Planner', icon: <Globe size={32} />, href: '/tools/meeting', desc: 'Coordinate across timezones' },
        { name: 'Password Generator', icon: <Key size={32} />, href: '/tools/password-generator', desc: 'Secure password creation', premium: true },
        { name: 'AI Assistant', icon: <Bot size={32} />, href: '/tools/ai-assistant', desc: 'Chat, Summarize, & Generate', premium: true },
        { name: 'AI Vision', icon: <Eye size={32} />, href: '/tools/ai-vision', desc: 'Solve math from photos, OCR', premium: true },
        { name: 'Focus Timer', icon: <Timer size={32} />, href: '/tools/pomodoro', desc: 'Pomodoro & Task Tracking', premium: true },
        { name: 'Habit Tracker', icon: <Activity size={32} />, href: '/tools/habit-tracker', desc: 'Build streaks & routines', premium: true },
        { name: 'PDF Tools', icon: <FileText size={32} />, href: '/tools/pdf', desc: 'Merge, Split, Compress', premium: true },
        { name: 'QR Generator', icon: <QrCode size={32} />, href: '/tools/qr-code', desc: 'Create & Download QR Codes', premium: true },
        { name: 'Image Converter', icon: <RefreshCw size={32} />, href: '/tools/image-converter', desc: 'Convert & Resize Images', premium: true },
        { name: 'Timetable Generator', icon: <Calendar size={32} />, href: '/tools/timetable', desc: 'Create & Print Class Schedules', premium: false },
        { name: 'Time Suite', icon: <Clock size={32} />, href: '/tools/time', desc: 'Stopwatch & Timer', premium: true },
        { name: 'Study Hub', icon: <BookOpen size={32} />, href: '/tools/study', desc: 'Flashcards, Quizzes, Summarizer', premium: true },
        { name: 'Remix Station', icon: <Music size={32} />, href: '/tools/remix', desc: 'Audio & Music Tools', premium: true },
        { name: 'Tiny Tools', icon: <Zap size={32} />, href: '/tools/tiny', desc: 'Quick Utilities: Memo, Todo', premium: true },
        { name: 'Age Calculator', icon: <User size={32} />, href: '/tools/age-calculator', desc: 'Calculate exact age & milestones', premium: true },
        { name: 'Bookmarks Manager', icon: <Bookmark size={32} />, href: '/tools/bookmarks', desc: 'Organize your favorite links', premium: true },
        { name: 'Currency Converter', icon: <Coins size={32} />, href: '/tools/currency-converter', desc: 'Real-time exchange rates', premium: true },
        { name: 'Design Tools', icon: <Palette size={32} />, href: '/tools/design', desc: 'Colors, Gradients, & Fonts', premium: true },
        { name: 'Dev Utilities', icon: <Terminal size={32} />, href: '/tools/dev', desc: 'JSON, Base64, Regex', premium: true },
        { name: 'Fun Zone', icon: <Gamepad2 size={32} />, href: '/tools/fun', desc: 'Games & Interactive Toys', premium: true },
        { name: 'Math Tools', icon: <Sigma size={32} />, href: '/tools/math', desc: 'Advanced Calculators & Graphing', premium: true },
        { name: 'Mood Tracker', icon: <Heart size={32} />, href: '/tools/mood', desc: 'Track your daily mood', premium: true },
        { name: 'Name Generator', icon: <User size={32} />, href: '/tools/names', desc: 'Generate creative names', premium: true },
        { name: 'Scheduler', icon: <Calendar size={32} />, href: '/tools/scheduler', desc: 'Plan your week efficiently', premium: true },
        { name: 'Sunrise/Sunset', icon: <Sunrise size={32} />, href: '/tools/sunrise-sunset', desc: 'Solar times for any location', premium: true },
        { name: 'Timezone Viewer', icon: <Globe size={32} />, href: '/tools/timezone-viewer', desc: 'Visual world clock', premium: true },
        { name: 'Tip Calculator', icon: <Coins size={32} />, href: '/tools/tip-calculator', desc: 'Split bills easily', premium: true },
    ]

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Power Tools</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {tools.map((tool, i) => (
                    <Link key={i} href={tool.href} className="glass-panel" style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        textDecoration: 'none',
                        color: 'inherit',
                        position: 'relative'
                    }}>
                        {tool.premium && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                                padding: '0.25rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <Crown size={12} /> PRO
                            </div>
                        )}
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
