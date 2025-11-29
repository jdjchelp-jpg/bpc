'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Volume2, VolumeX, CloudRain, Wind, Zap, Coffee } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function MoodSoundboard() {
    const [activeSounds, setActiveSounds] = useState({});
    const [masterVolume, setMasterVolume] = useState(0.5);
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef({});

    const sounds = [
        { id: 'white', name: 'White Noise', icon: <Zap className="w-6 h-6" />, color: 'bg-gray-100 text-gray-600' },
        { id: 'pink', name: 'Pink Noise', icon: <CloudRain className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600' },
        { id: 'brown', name: 'Brown Noise', icon: <Wind className="w-6 h-6" />, color: 'bg-amber-100 text-amber-800' },
        { id: 'binaural', name: 'Focus (40Hz)', icon: <Brain className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-600' },
    ];

    // Initialize Audio Context
    useEffect(() => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        return () => {
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    const toggleSound = (id) => {
        if (activeSounds[id]) {
            // Stop sound
            stopSound(id);
            const newActive = { ...activeSounds };
            delete newActive[id];
            setActiveSounds(newActive);
        } else {
            // Start sound
            startSound(id);
            setActiveSounds({ ...activeSounds, [id]: 0.5 });
        }
    };

    const startSound = (id) => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        // Create noise buffer
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;
            if (id === 'white') {
                output[i] = white;
            } else if (id === 'pink') {
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                white = output[i] * 3.5;
            } else if (id === 'brown') {
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                white = output[i] * 3.5;
            }
            // Simple approximation for demo purposes
            output[i] = white;
        }

        // This is a simplified placeholder for actual noise generation logic
        // Implementing true Pink/Brown noise requires complex filtering
        // For this demo, we'll use an oscillator for Binaural and White Noise for others

        let source;
        const gainNode = ctx.createGain();

        if (id === 'binaural') {
            source = ctx.createOscillator();
            source.type = 'sine';
            source.frequency.value = 40; // Gamma waves for focus
        } else {
            // White noise fallback for all noise types in this simple demo
            source = ctx.createBufferSource();
            source.buffer = noiseBuffer;
            source.loop = true;
        }

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();

        oscillatorsRef.current[id] = { source, gainNode };
        gainNode.gain.value = 0.5 * masterVolume;
    };

    const stopSound = (id) => {
        if (oscillatorsRef.current[id]) {
            oscillatorsRef.current[id].source.stop();
            delete oscillatorsRef.current[id];
        }
    };

    const updateVolume = (id, val) => {
        const newActive = { ...activeSounds, [id]: val };
        setActiveSounds(newActive);
        if (oscillatorsRef.current[id]) {
            oscillatorsRef.current[id].gainNode.gain.value = val * masterVolume;
        }
    };

    // Helper for Brain icon
    function Brain({ className }) {
        return (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        );
    }

    let lastOut = 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 bg-indigo-50 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-indigo-900 mb-2">Mood Soundboard</h1>
                                <p className="text-indigo-700">Ambient sounds for focus and relaxation.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                                <Volume2 className="w-5 h-5 text-indigo-900" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={masterVolume}
                                    onChange={(e) => setMasterVolume(Number(e.target.value))}
                                    className="w-24 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sounds.map((sound) => (
                                <div
                                    key={sound.id}
                                    className={`p-6 rounded-xl border-2 transition-all ${activeSounds[sound.id] !== undefined
                                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className={`p-3 rounded-lg mr-4 ${sound.color}`}>
                                                {sound.icon}
                                            </div>
                                            <h3 className="font-bold text-gray-900">{sound.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => toggleSound(sound.id)}
                                            className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeSounds[sound.id] !== undefined
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {activeSounds[sound.id] !== undefined ? 'Stop' : 'Play'}
                                        </button>
                                    </div>

                                    {activeSounds[sound.id] !== undefined && (
                                        <div className="flex items-center gap-3">
                                            <VolumeX className="w-4 h-4 text-gray-400" />
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={activeSounds[sound.id]}
                                                onChange={(e) => updateVolume(sound.id, Number(e.target.value))}
                                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <Volume2 className="w-4 h-4 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-yellow-50 text-yellow-800 text-sm text-center border-t border-yellow-100">
                            Note: This is a demo using generated audio. High-quality samples coming soon.
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
