'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Clock, Search } from 'lucide-react';

export default function TimezoneViewer() {
    const [timezones, setTimezones] = useState([]);
    const [search, setSearch] = useState('');
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        // Get all supported timezones
        const zones = Intl.supportedValuesOf('timeZone');
        setTimezones(zones);

        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const filteredZones = timezones.filter(zone =>
        zone.toLowerCase().includes(search.toLowerCase())
    );

    const formatTime = (zone) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: zone,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }).format(now);
        } catch (e) {
            return 'Invalid Timezone';
        }
    };

    const getOffset = (zone) => {
        try {
            const date = new Date();
            const str = date.toLocaleString('en-US', { timeZone: zone, timeZoneName: 'longOffset' });
            const match = str.match(/GMT([+-]\d{2}:\d{2})/);
            return match ? match[1] : '';
        } catch (e) {
            return '';
        }
    };

    // Common major cities for quick access
    const majorCities = [
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney',
        'America/Los_Angeles',
        'Europe/Paris',
        'Asia/Dubai',
        'Asia/Singapore'
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="p-8 border-b border-gray-100 bg-blue-50">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">World Clock</h1>
                        <p className="text-blue-700">Check the current time across the globe.</p>
                    </div>

                    <div className="p-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search city or timezone..."
                                className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>

                        {/* Major Cities Grid */}
                        {!search && (
                            <div className="mb-10">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Major Cities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {majorCities.map(zone => (
                                        <div key={zone} className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                                            <p className="text-sm text-gray-500 mb-1 truncate">{zone.split('/')[1].replace(/_/g, ' ')}</p>
                                            <p className="text-xl font-bold text-gray-900">{formatTime(zone).split(',')[2] || formatTime(zone)}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs text-gray-400">{formatTime(zone).split(',')[0]}, {formatTime(zone).split(',')[1]}</span>
                                                <span className="text-xs font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">GMT{getOffset(zone)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Zones List */}
                        <h2 className="text-lg font-bold text-gray-900 mb-4">All Timezones</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                            {filteredZones.slice(0, 50).map(zone => (
                                <div key={zone} className="flex flex-col p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-medium text-gray-900 truncate pr-2" title={zone}>{zone}</span>
                                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">GMT{getOffset(zone)}</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{formatTime(zone)}</span>
                                </div>
                            ))}
                            {filteredZones.length > 50 && (
                                <div className="col-span-full text-center py-4 text-gray-500 text-sm">
                                    And {filteredZones.length - 50} more... Use search to find specific places.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
