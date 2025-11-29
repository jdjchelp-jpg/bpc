'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, Copy, Check, RefreshCw } from 'lucide-react';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#4F46E5');
    const [color2, setColor2] = useState('#EC4899');
    const [angle, setAngle] = useState(135);
    const [copied, setCopied] = useState(false);

    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    const generateRandom = () => {
        setColor1('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        setColor2('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        setAngle(Math.floor(Math.random() * 360));
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(`background: ${gradient};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/design" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Design Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Controls */}
                    <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Palette className="w-5 h-5 mr-2 text-pink-500" />
                            Controls
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color 1</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color 2</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Angle: {angle}°</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={angle}
                                    onChange={(e) => setAngle(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <button
                                onClick={generateRandom}
                                className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Randomize
                            </button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="w-full md:w-2/3 relative flex flex-col">
                        <div
                            className="flex-1 w-full h-full transition-all duration-300"
                            style={{ background: gradient }}
                        />

                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                            <button
                                onClick={copyCSS}
                                className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-bold shadow-lg hover:bg-white transition-all flex items-center"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2 text-green-600" />
                                        Copied CSS!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5 mr-2" />
                                        Copy CSS
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
