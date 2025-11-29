'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon, MapPin, Loader2, Sunrise, Sunset } from 'lucide-react';

export default function SunriseSunset() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getLocation = () => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                fetchData(latitude, longitude);
            },
            (err) => {
                setError('Unable to retrieve your location. Please allow location access.');
                setLoading(false);
            }
        );
    };

    const fetchData = async (lat, lng) => {
        try {
            const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
            const result = await response.json();

            if (result.status === 'OK') {
                setData(result.results);
            } else {
                setError('Failed to fetch sunrise data.');
            }
        } catch (err) {
            setError('Error connecting to service.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-orange-50">
                        <h1 className="text-3xl font-bold text-orange-900 mb-2">Sunrise & Sunset</h1>
                        <p className="text-orange-700">Get precise solar times for your current location.</p>
                    </div>

                    <div className="p-8">
                        {!data && !loading && (
                            <div className="text-center py-12">
                                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sun className="w-10 h-10 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Locate Sun Times</h3>
                                <p className="text-gray-600 mb-8">We need your location to calculate accurate sunrise and sunset times.</p>
                                <button
                                    onClick={getLocation}
                                    className="px-8 py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30 flex items-center justify-center mx-auto transition-all"
                                >
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Use My Location
                                </button>
                                {error && <p className="mt-4 text-red-500">{error}</p>}
                            </div>
                        )}

                        {loading && (
                            <div className="text-center py-20">
                                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                                <p className="text-gray-600">Calculating solar position...</p>
                            </div>
                        )}

                        {data && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                                        <Sunrise className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                                        <p className="text-sm text-orange-700 font-medium uppercase tracking-wide">Sunrise</p>
                                        <p className="text-3xl font-bold text-gray-900">{formatTime(data.sunrise)}</p>
                                    </div>
                                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
                                        <Sunset className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
                                        <p className="text-sm text-indigo-700 font-medium uppercase tracking-wide">Sunset</p>
                                        <p className="text-3xl font-bold text-gray-900">{formatTime(data.sunset)}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Day Details</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Day Length</span>
                                            <span className="font-medium text-gray-900">{(data.day_length / 3600).toFixed(1)} hrs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Solar Noon</span>
                                            <span className="font-medium text-gray-900">{formatTime(data.solar_noon)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Civil Twilight Begin</span>
                                            <span className="font-medium text-gray-900">{formatTime(data.civil_twilight_begin)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Civil Twilight End</span>
                                            <span className="font-medium text-gray-900">{formatTime(data.civil_twilight_end)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={getLocation}
                                    className="w-full py-3 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                                >
                                    Refresh Location
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
