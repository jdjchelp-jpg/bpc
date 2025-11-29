'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, RefreshCw, Copy, Check, Lock, Unlock } from 'lucide-react';

export default function PaletteGenerator() {
    const [colors, setColors] = useState([]);
    const [locked, setLocked] = useState([false, false, false, false, false]);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        generatePalette();
    }, []);

    const generateColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };

    const generatePalette = () => {
        const newColors = [];
        for (let i = 0; i < 5; i++) {
            if (locked[i] && colors[i]) {
                newColors.push(colors[i]);
            } else {
                newColors.push(generateColor());
            }
        }
        setColors(newColors);
    };

    const toggleLock = (index) => {
        const newLocked = [...locked];
        newLocked[index] = !newLocked[index];
        setLocked(newLocked);
    };

    const copyColor = (color, index) => {
        navigator.clipboard.writeText(color);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/tools/design" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Design Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-teal-50 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-teal-900 mb-2">Palette Generator</h1>
                            <p className="text-teal-700">Generate beautiful color combinations.</p>
                        </div>
                        <button
                            onClick={generatePalette}
                            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center shadow-lg hover:shadow-teal-500/30"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Generate New
                        </button>
                    </div>

                    <div className="h-[60vh] flex flex-col md:flex-row">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="flex-1 relative group transition-all duration-300 flex flex-col items-center justify-center"
                                style={{ backgroundColor: color }}
                            >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                                    <button
                                        onClick={() => toggleLock(index)}
                                        className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors text-gray-800"
                                    >
                                        {locked[index] ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
                                    </button>

                                    <button
                                        onClick={() => copyColor(color, index)}
                                        className="px-4 py-2 bg-white/90 rounded-lg font-mono font-bold hover:bg-white transition-colors text-gray-800 min-w-[100px] text-center"
                                    >
                                        {copied === index ? 'Copied!' : color.toUpperCase()}
                                    </button>
                                </div>

                                {/* Mobile view text */}
                                <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-lg font-mono text-sm font-bold">
                                    {color.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 text-center text-gray-500 text-sm">
                        Press Spacebar to generate a new palette (coming soon)
                    </div>
                </div>
            </div>
        </div>
    );
}
