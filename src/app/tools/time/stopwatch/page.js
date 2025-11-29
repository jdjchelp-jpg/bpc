'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <Link href="/tools/time" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Time Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-blue-50">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Stopwatch</h1>
                        <p className="text-blue-700">Track time with precision.</p>
                    </div>

                    <div className="p-12 flex flex-col items-center">
                        <div className="text-7xl font-mono font-bold text-gray-900 mb-12 tracking-wider">
                            {formatTime(time)}
                        </div>

                        <div className="flex gap-4 mb-12">
                            <button
                                onClick={handleStartStop}
                                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 ${isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                                    }`}
                            >
                                {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </button>

                            <button
                                onClick={handleLap}
                                disabled={!isRunning}
                                className="w-20 h-20 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Flag className="w-8 h-8" />
                            </button>

                            <button
                                onClick={handleReset}
                                className="w-20 h-20 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all"
                            >
                                <RotateCcw className="w-8 h-8" />
                            </button>
                        </div>

                        {laps.length > 0 && (
                            <div className="w-full border-t border-gray-100 pt-8">
                                <h3 className="text-lg font-bold text-gray-700 mb-4">Laps</h3>
                                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                                    {laps.map((lapTime, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500 font-medium">Lap {index + 1}</span>
                                            <span className="font-mono font-bold text-gray-900">{formatTime(lapTime)}</span>
                                        </div>
                                    )).reverse()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
