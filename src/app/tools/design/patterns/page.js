'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Copy, Check } from 'lucide-react';

export default function PatternMaker() {
    const [pattern, setPattern] = useState('dots');
    const [color, setColor] = useState('#4F46E5');
    const [bg, setBg] = useState('#F3F4F6');
    const [opacity, setOpacity] = useState(0.1);
    const [copied, setCopied] = useState(false);

    const getCSS = () => {
        const rgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const c = rgba(color, opacity);

        switch (pattern) {
            case 'dots':
                return `background-color: ${bg};
background-image: radial-gradient(${c} 1px, transparent 1px);
background-size: 20px 20px;`;
            case 'grid':
                return `background-color: ${bg};
background-image: linear-gradient(${c} 1px, transparent 1px),
linear-gradient(90deg, ${c} 1px, transparent 1px);
background-size: 20px 20px;`;
            case 'diagonal':
                return `background-color: ${bg};
background: repeating-linear-gradient(
  45deg,
  ${c},
  ${c} 10px,
  ${bg} 10px,
  ${bg} 20px
);`;
            default:
                return '';
        }
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(getCSS());
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
                            <Layers className="w-5 h-5 mr-2 text-indigo-500" />
                            Controls
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['dots', 'grid', 'diagonal'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPattern(p)}
                                            className={`p-2 text-sm rounded-lg capitalize ${pattern === p
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern Color</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={bg}
                                        onChange={(e) => setBg(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={bg}
                                        onChange={(e) => setBg(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Opacity: {Math.round(opacity * 100)}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={opacity}
                                    onChange={(e) => setOpacity(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="w-full md:w-2/3 relative flex flex-col">
                        <div
                            className="flex-1 w-full h-full transition-all duration-300"
                            style={{ cssText: getCSS() }}
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
