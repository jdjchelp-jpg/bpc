'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import { getUpcomingHolidays } from '@/lib/holidays'
import { supabase } from '@/lib/supabase'
import { Plus, Calendar, Clock, ArrowRight, Timer, Sparkles } from 'lucide-react'

export default function CountdownDashboard() {
    const [holidays, setHolidays] = useState([])
    const [userCountdowns, setUserCountdowns] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // 1. Get Holidays
            const upcoming = getUpcomingHolidays('US', 3)
            setHolidays(upcoming)

            // 2. Get User Countdowns (if any)
            if (supabase) {
                const { data } = await supabase
                    .from('countdowns')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5)

                if (data) setUserCountdowns(data)
            }

            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16">
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                            <Timer className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Smart Countdowns</h1>
                            <p className="text-lg text-gray-500 font-medium">Track your most anticipated moments in style.</p>
                        </div>
                    </div>
                    <Link
                        href="/countdown/create"
                        className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Event
                        </div>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-6 text-gray-500 font-medium animate-pulse">Loading your timeline...</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* User Countdowns Section */}
                        {userCountdowns.length > 0 && (
                            <section>
                                <div className="flex items-center mb-8">
                                    <div className="h-10 w-1 bg-blue-500 rounded-full mr-4" />
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <Clock className="w-6 h-6 mr-3 text-blue-500" />
                                        Your Events
                                    </h2>
                                </div>
                                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {userCountdowns.map((countdown) => (
                                        <Link key={countdown.id} href={`/countdown/${countdown.id}`} className="group">
                                            <div className="h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-3xl overflow-hidden relative bg-white border border-gray-100">
                                                <CountdownTimer
                                                    title={countdown.title}
                                                    targetDate={countdown.target_date}
                                                    theme={countdown.theme}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg text-blue-600">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Upcoming Holidays Section */}
                        <section>
                            <div className="flex items-center mb-8">
                                <div className="h-10 w-1 bg-green-500 rounded-full mr-4" />
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <Sparkles className="w-6 h-6 mr-3 text-green-500" />
                                    Upcoming Holidays
                                </h2>
                            </div>
                            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {holidays.map((holiday, index) => (
                                    <div key={index} className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-3xl overflow-hidden bg-white border border-gray-100">
                                        <CountdownTimer
                                            title={holiday.name}
                                            targetDate={holiday.date}
                                            theme={holiday.name.toLowerCase().includes('christmas') ? 'christmas' : holiday.name.toLowerCase().includes('new year') ? 'newyear' : 'default'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}
