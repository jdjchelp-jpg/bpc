'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [initialTime, setInitialTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(5);
    const [inputSeconds, setInputSeconds] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
            // Play sound or alert
            alert("Time's up!");
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (timeLeft === 0) {
            const totalSeconds = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
            if (totalSeconds > 0) {
                setInitialTime(totalSeconds);
                setTimeLeft(totalSeconds);
                setIsRunning(true);
            }
        } else {
            setIsRunning(true);
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(0);
    };

    const adjustTime = (type, amount) => {
        if (type === 'h') setInputHours(Math.max(0, inputHours + amount));
        if (type === 'm') setInputMinutes(Math.max(0, Math.min(59, inputMinutes + amount)));
        if (type === 's') setInputSeconds(Math.max(0, Math.min(59, inputSeconds + amount)));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <Link href="/tools/time" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Time Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-orange-50">
                        <h1 className="text-3xl font-bold text-orange-900 mb-2">Timer</h1>
                        <p className="text-orange-700">Set your focus time.</p>
                    </div>

                    <div className="p-12 flex flex-col items-center">
                        {timeLeft > 0 || isRunning ? (
                            <div className="text-7xl font-mono font-bold text-gray-900 mb-12 tracking-wider">
                                {formatTime(timeLeft)}
                            </div>
                        ) : (
                            <div className="flex gap-4 mb-12">
                                <div className="flex flex-col items-center">
                                    <button onClick={() => adjustTime('h', 1)} className="p-2 text-gray-400 hover:text-gray-600"><Plus className="w-6 h-6" /></button>
                                    <div className="text-4xl font-mono font-bold text-gray-900 w-20 text-center">{inputHours.toString().padStart(2, '0')}</div>
                                    <span className="text-xs text-gray-500 uppercase font-bold mt-1">Hours</span>
                                    <button onClick={() => adjustTime('h', -1)} className="p-2 text-gray-400 hover:text-gray-600"><Minus className="w-6 h-6" /></button>
                                </div>
                                <div className="text-4xl font-mono font-bold text-gray-300 self-center mb-6">:</div>
                                <div className="flex flex-col items-center">
                                    <button onClick={() => adjustTime('m', 1)} className="p-2 text-gray-400 hover:text-gray-600"><Plus className="w-6 h-6" /></button>
                                    <div className="text-4xl font-mono font-bold text-gray-900 w-20 text-center">{inputMinutes.toString().padStart(2, '0')}</div>
                                    <span className="text-xs text-gray-500 uppercase font-bold mt-1">Mins</span>
                                    <button onClick={() => adjustTime('m', -1)} className="p-2 text-gray-400 hover:text-gray-600"><Minus className="w-6 h-6" /></button>
                                </div>
                                <div className="text-4xl font-mono font-bold text-gray-300 self-center mb-6">:</div>
                                <div className="flex flex-col items-center">
                                    <button onClick={() => adjustTime('s', 1)} className="p-2 text-gray-400 hover:text-gray-600"><Plus className="w-6 h-6" /></button>
                                    <div className="text-4xl font-mono font-bold text-gray-900 w-20 text-center">{inputSeconds.toString().padStart(2, '0')}</div>
                                    <span className="text-xs text-gray-500 uppercase font-bold mt-1">Secs</span>
                                    <button onClick={() => adjustTime('s', -1)} className="p-2 text-gray-400 hover:text-gray-600"><Minus className="w-6 h-6" /></button>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            {!isRunning ? (
                                <button
                                    onClick={startTimer}
                                    className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
                                >
                                    <Play className="w-8 h-8 ml-1" />
                                </button>
                            ) : (
                                <button
                                    onClick={pauseTimer}
                                    className="w-20 h-20 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
                                >
                                    <Pause className="w-8 h-8" />
                                </button>
                            )}

                            <button
                                onClick={resetTimer}
                                className="w-20 h-20 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all"
                            >
                                <RotateCcw className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
