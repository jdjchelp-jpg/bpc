'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Cake } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, addYears, format } from 'date-fns';

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!birthDate) return;

        const start = new Date(birthDate);
        const now = new Date();

        if (start > now) {
            setStats(null);
            return;
        }

        const years = differenceInYears(now, start);
        const months = differenceInMonths(now, start);
        const weeks = differenceInWeeks(now, start);
        const days = differenceInDays(now, start);

        // Next birthday
        const currentYear = now.getFullYear();
        let nextBirthday = new Date(start);
        nextBirthday.setFullYear(currentYear);
        if (nextBirthday < now) {
            nextBirthday.setFullYear(currentYear + 1);
        }
        const daysToBirthday = differenceInDays(nextBirthday, now);

        setStats({
            years,
            months,
            weeks,
            days,
            nextBirthday: format(nextBirthday, 'MMMM do, yyyy'),
            daysToBirthday
        });
    }, [birthDate]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-indigo-50">
                        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Age Calculator</h1>
                        <p className="text-indigo-700">Discover exactly how old you are in days, weeks, and months.</p>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                            />
                        </div>

                        {stats ? (
                            <div className="space-y-6">
                                <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-indigo-200">
                                    <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider mb-2">You are</p>
                                    <div className="text-6xl font-bold mb-2">{stats.years}</div>
                                    <p className="text-indigo-200 text-lg">years old</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.months.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Months</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.weeks.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Weeks</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.days.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Days</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                                            <Cake className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Next Birthday</p>
                                            <p className="text-lg font-bold text-gray-900">{stats.nextBirthday}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-pink-600">{stats.daysToBirthday}</p>
                                        <p className="text-xs text-pink-400">Days to go</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>Select your birth date to see your stats.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
