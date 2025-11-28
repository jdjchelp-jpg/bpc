'use client'

import { useSettings } from '@/context/SettingsContext'
import { useToast } from '@/components/ToastProvider'
import { Save } from 'lucide-react'

export default function SettingsPage() {
    const { settings, updateSettings } = useSettings()
    const { addToast } = useToast()

    const handleSave = () => {
        addToast('Settings saved successfully!')
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '600px' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Settings</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Preferences</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <label>Temperature Unit</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => updateSettings({ tempUnit: 'celsius' })}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: settings.tempUnit === 'celsius' ? 'var(--primary)' : 'var(--surface)',
                                    color: 'white',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                Celsius
                            </button>
                            <button
                                onClick={() => updateSettings({ tempUnit: 'fahrenheit' })}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: settings.tempUnit === 'fahrenheit' ? 'var(--primary)' : 'var(--surface)',
                                    color: 'white',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                Fahrenheit
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <label>Time Format</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => updateSettings({ timeFormat: '12h' })}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: settings.timeFormat === '12h' ? 'var(--primary)' : 'var(--surface)',
                                    color: 'white',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                12h
                            </button>
                            <button
                                onClick={() => updateSettings({ timeFormat: '24h' })}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: settings.timeFormat === '24h' ? 'var(--primary)' : 'var(--surface)',
                                    color: 'white',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                24h
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label>Animations</label>
                        <button
                            onClick={() => updateSettings({ animations: !settings.animations })}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: settings.animations ? 'var(--primary)' : 'var(--surface)',
                                color: 'white',
                                border: '1px solid var(--border)'
                            }}
                        >
                            {settings.animations ? 'On' : 'Off'}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Save size={18} /> Save Settings
                </button>
            </div>
        </div>
    )
}
