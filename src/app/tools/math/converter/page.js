'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ArrowRightLeft } from 'lucide-react';

export default function UnitConverter() {
    const [category, setCategory] = useState('length');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [value, setValue] = useState(1);
    const [result, setResult] = useState(0);

    const units = {
        length: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            miles: 0.000621371,
            yards: 1.09361,
            feet: 3.28084,
            inches: 39.3701
        },
        weight: {
            kilograms: 1,
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
            ounces: 35.274
        },
        temperature: {
            celsius: 'C',
            fahrenheit: 'F',
            kelvin: 'K'
        }
    };

    useEffect(() => {
        // Set default units when category changes
        const keys = Object.keys(units[category]);
        setFromUnit(keys[0]);
        setToUnit(keys[1]);
    }, [category]);

    useEffect(() => {
        convert();
    }, [value, fromUnit, toUnit, category]);

    const convert = () => {
        if (category === 'temperature') {
            let tempInC = value;
            if (fromUnit === 'fahrenheit') tempInC = (value - 32) * 5 / 9;
            if (fromUnit === 'kelvin') tempInC = value - 273.15;

            let res = tempInC;
            if (toUnit === 'fahrenheit') res = (tempInC * 9 / 5) + 32;
            if (toUnit === 'kelvin') res = tempInC + 273.15;

            setResult(res);
        } else {
            const fromRate = units[category][fromUnit];
            const toRate = units[category][toUnit];
            const res = (value / fromRate) * toRate;
            setResult(res);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools/math" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Math Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-green-50">
                        <h1 className="text-3xl font-bold text-green-900 mb-2">Unit Converter</h1>
                        <p className="text-green-700">Convert anything to anything.</p>
                    </div>

                    <div className="p-8">
                        {/* Category Selector */}
                        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                            {Object.keys(units).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${category === cat
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Converter Interface */}
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => setValue(Number(e.target.value))}
                                    className="w-full p-3 border border-gray-300 rounded-xl mb-2 text-lg font-mono"
                                />
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg capitalize"
                                >
                                    {Object.keys(units[category]).map((u) => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-gray-400">
                                <ArrowRightLeft className="w-6 h-6 md:rotate-0 rotate-90" />
                            </div>

                            <div className="flex-1 w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl mb-2 text-lg font-mono font-bold text-gray-800">
                                    {result.toFixed(4)}
                                </div>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg capitalize"
                                >
                                    {Object.keys(units[category]).map((u) => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
