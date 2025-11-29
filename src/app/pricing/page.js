'use client'

import Link from 'next/link'
import { Check, X, Mail } from 'lucide-react'

export default function PricingPage() {
    const features = {
        free: [
            'Unlimited Countdowns',
            'Yearly Calendar View with Holidays',
            'Custom Country Selection',
            'Advanced Worksheets (1-50 tables)',
            'Printable Calendars with Logo',
            'Scientific Calculator',
            'Unit Converter',
            'Roman Numeral Converter',
            'Meeting Planner (Unlimited timezones)',
            'Custom Countdown Themes',
            'Embed Codes for Countdowns',
            'Speed Test',
            'Weather Dashboard'
        ],
        premium: [
            '🔥 AI Assistant (Chat, Summarize, Generate)',
            '🔥 AI Vision (Solve math from photos, OCR)',
            '🔥 Password Generator',
            '🔥 Pomodoro Timer & Focus Tools',
            '🔥 Habit Tracker',
            '🔥 PDF Tools (Merge, Split, Compress)',
            '🔥 QR Code Creator & Scanner',
            '🔥 Image Converter & Tools',
            'Export to PDF',
            'Priority Support',
            'Early Access to New Features',
            'Custom Branding Options'
        ]
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="heading-xl">Pricing Plans</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>
                    Choose the plan that works best for you
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Free Plan */}
                <div className="glass-panel" style={{
                    padding: '2rem',
                    position: 'relative',
                    border: '2px solid var(--border)'
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Free</h2>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>$0</span>
                        <span style={{ color: 'var(--text-muted)' }}>/forever</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        {features.free.map((feature, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                color: 'var(--text-muted)'
                            }}>
                                <Check size={20} style={{ color: 'var(--primary)' }} />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/"
                        className="btn-primary"
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            display: 'block',
                            textDecoration: 'none'
                        }}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Premium Plan */}
                <div className="glass-panel" style={{
                    padding: '2rem',
                    position: 'relative',
                    border: '2px solid var(--primary)',
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        right: '20px',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        POPULAR
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Premium</h2>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>Contact</span>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '1rem' }}>
                            for pricing
                        </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        <li style={{
                            marginBottom: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--border)',
                            fontWeight: 'bold'
                        }}>
                            Everything in Free, plus:
                        </li>
                        {features.premium.map((feature, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                <Check size={20} style={{ color: 'var(--accent)' }} />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <a
                        href="mailto:jdjchelp@gmail.com?subject=Blue Peak Countdown Premium Inquiry"
                        className="btn-primary"
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            background: 'var(--accent)'
                        }}
                    >
                        <Mail size={20} />
                        Contact for Premium
                    </a>
                </div>
            </div>

            {/* FAQ Section */}
            <div style={{
                marginTop: '4rem',
                maxWidth: '800px',
                margin: '4rem auto 0'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>How do I upgrade to Premium?</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Simply email us at <a href="mailto:jdjchelp@gmail.com" style={{ color: 'var(--primary)' }}>jdjchelp@gmail.com</a> with your requirements, and we'll provide you with a custom quote.
                        </p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Can I try Premium features before purchasing?</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Yes! Contact us for a free trial period to test all premium features.
                        </p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>What payment methods do you accept?</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            We accept all major payment methods. Details will be provided when you contact us.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Is there a refund policy?</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Yes, we offer a 30-day money-back guarantee if you're not satisfied with Premium.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
