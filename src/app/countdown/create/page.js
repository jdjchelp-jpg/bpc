'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCountries } from '@/lib/holidays'
import Link from 'next/link'
import { ArrowLeft, Calendar, Globe, Palette, Type, Loader2 } from 'lucide-react'

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

    useEffect(() => {
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
            alert(`Failed to create countdown: ${error.message || 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const themes = [
        { id: 'default', name: 'Dark Mode (Default)', color: 'bg-gray-800' },
        { id: 'christmas', name: 'Christmas Spirit', color: 'bg-red-800' },
        { id: 'newyear', name: 'New Year Party', color: 'bg-purple-800' },
        { id: 'neon', name: 'Neon Cyberpunk', color: 'bg-black border border-green-500' },
        { id: 'birthday', name: 'Birthday Bash', color: 'bg-pink-500' },
        { id: 'summer', name: 'Summer Vibes', color: 'bg-orange-400' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/countdown" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-blue-50">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Create Countdown</h1>
                        <p className="text-blue-700">Set the date for your next big moment.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Type className="w-4 h-4 mr-2" />
                                Event Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., My Birthday, Vacation, Project Launch"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Target Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.targetDate}
                                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Palette className="w-4 h-4 mr-2" />
                                Theme
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, theme: theme.id })}
                                        className={`p-3 rounded-lg text-left transition-all border-2 ${formData.theme === theme.id
                                                ? 'border-blue-500 ring-2 ring-blue-200'
                                                : 'border-transparent hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-full h-12 rounded-md mb-2 ${theme.color}`}></div>
                                        <span className="text-xs font-medium text-gray-700">{theme.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Globe className="w-4 h-4 mr-2" />
                                Country (for Holidays)
                            </label>
                            <select
                                value={formData.country || 'US'}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.entries(countries).map(([code, name]) => (
                                    <option key={code} value={code}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Countdown'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
