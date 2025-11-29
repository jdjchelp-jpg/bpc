'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import { getUpcomingHolidays } from '@/lib/holidays'
import { supabase } from '@/lib/supabase'
import { Plus, Calendar, Clock, ArrowRight } from 'lucide-react'

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
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Smart Countdowns</h1>
                        <p className="text-xl text-gray-600">Track your most anticipated moments.</p>
                    </div>
                    <Link
                        href="/countdown/create"
                        className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 transition-all flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading your events...</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* User Countdowns Section */}
                        {userCountdowns.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Clock className="w-6 h-6 mr-2 text-blue-500" />
                                    Your Countdowns
                                </h2>
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {userCountdowns.map((countdown) => (
                                        <Link key={countdown.id} href={`/countdown/${countdown.id}`} className="group">
                                            <div className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl overflow-hidden relative">
                                                <CountdownTimer
                                                    title={countdown.title}
                                                    targetDate={countdown.target_date}
                                                    theme={countdown.theme}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                                                        <ArrowRight className="w-5 h-5 text-white" />
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Calendar className="w-6 h-6 mr-2 text-green-500" />
                                Upcoming Holidays
                            </h2>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {holidays.map((holiday, index) => (
                                    <div key={index} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl overflow-hidden">
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
