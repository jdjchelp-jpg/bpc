'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCountries } from '@/lib/holidays'

export default function CreateCountdown() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState({})
    const [formData, setFormData] = useState({
        title: '',
        targetDate: '',
        theme: 'default',
        country: 'US'
    })

    useState(() => {
        setCountries(getCountries())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!supabase) {
            alert('Supabase client not initialized. Check environment variables.')
            return
        }

        setLoading(true)

        try {
            const { data, error } = await supabase
                .from('countdowns')
                .insert([
                    {
                        title: formData.title,
                        target_date: new Date(formData.targetDate).toISOString(),
                        theme: formData.theme,
                        country: formData.country,
                        is_public: true
                    }
                ])
                .select()

            if (error) throw error

            if (data && data[0]) {
                router.push(`/countdown/${data[0].id}`)
            }
        } catch (error) {
            console.error('Error creating countdown:', error)
            console.error('Error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            })
            alert(`Failed to create countdown: ${error.message || 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '600px' }}>
            <h1 className="heading-lg">Create Countdown</h1>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Event Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                        placeholder="e.g., My Birthday"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Target Date & Time</label>
                    <input
                        type="datetime-local"
                        required
                        value={formData.targetDate}
                        onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Theme</label>
                    <select
                        value={formData.theme}
                        onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    >
                        <option value="default">Default (Dark)</option>
                        <option value="christmas">Christmas</option>
                        <option value="newyear">New Year</option>
                    </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Country (for Holidays)</label>
                    <select
                        value={formData.country || 'US'}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    >
                        {Object.entries(countries).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%' }}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Countdown'}
                </button>
            </form>
        </div>
    )
}
