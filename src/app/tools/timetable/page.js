'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Printer } from 'lucide-react';

export default function TimetableGenerator() {
    const [title, setTitle] = useState('1C');
    const [days, setDays] = useState(['Mo', 'Tu', 'We', 'Th', 'Fr']);
    const [timeSlots, setTimeSlots] = useState([
        { id: 1, start: '08:00', end: '09:00' },
        { id: 2, start: '09:00', end: '10:00' },
        { id: 3, start: '10:00', end: '11:00', type: 'break', label: 'Lunch' },
        { id: 4, start: '11:00', end: '12:00' },
        { id: 5, start: '12:00', end: '13:00' },
        { id: 6, start: '13:00', end: '14:00' },
        { id: 7, start: '14:00', end: '15:00' },
        { id: 8, start: '15:00', end: '15:45' },
    ]);

    // Grid data: mapping "dayIndex-slotIndex" to { subject, teacher, room }
    const [gridData, setGridData] = useState({});
    const [selectedCell, setSelectedCell] = useState(null);

    // Form state for editing a cell
    const [editSubject, setEditSubject] = useState('');
    const [editTeacher, setEditTeacher] = useState('');
    const [editRoom, setEditRoom] = useState('');

    const handleCellClick = (dayIndex, slotIndex) => {
        const key = `${dayIndex}-${slotIndex}`;
        setSelectedCell({ dayIndex, slotIndex, key });
        const data = gridData[key] || {};
        setEditSubject(data.subject || '');
        setEditTeacher(data.teacher || '');
        setEditRoom(data.room || '');
    };

    const saveCellData = (e) => {
        e.preventDefault();
        if (!selectedCell) return;

        setGridData({
            ...gridData,
            [selectedCell.key]: {
                subject: editSubject,
                teacher: editTeacher,
                room: editRoom
            }
        });
        setSelectedCell(null);
    };

    const addTimeSlot = () => {
        const lastSlot = timeSlots[timeSlots.length - 1];
        const newId = (lastSlot?.id || 0) + 1;
        // Simple logic to guess next hour
        let start = '16:00';
        let end = '17:00';

        if (lastSlot) {
            // Very basic time parsing just for demo defaults
            start = lastSlot.end;
            // Add 1 hour roughly
            const [h, m] = start.split(':').map(Number);
            const endH = (h + 1) % 24;
            end = `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        }

        setTimeSlots([...timeSlots, { id: newId, start, end }]);
    };

    const removeTimeSlot = (id) => {
        setTimeSlots(timeSlots.filter(ts => ts.id !== id));
    };

    const toggleBreak = (id) => {
        setTimeSlots(timeSlots.map(ts => {
            if (ts.id === id) {
                return ts.type === 'break'
                    ? { ...ts, type: undefined, label: undefined }
                    : { ...ts, type: 'break', label: 'Break' };
            }
            return ts;
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header - Hidden in Print */}
                <div className="print:hidden mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-2 transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Timetable Generator</h1>
                        <p className="text-gray-600">Create and print your class schedule for free.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print / PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls Sidebar - Hidden in Print */}
                    <div className="lg:col-span-3 space-y-6 print:hidden">

                        {/* Title Config */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Settings</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Timetable Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Editor Panel (Only shows when a cell is selected) */}
                        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all ${selectedCell ? 'ring-2 ring-blue-500' : ''}`}>
                            <h3 className="font-bold text-gray-900 mb-4">
                                {selectedCell ? `Edit ${days[selectedCell.dayIndex]} - Slot ${selectedCell.slotIndex + 1}` : 'Select a cell to edit'}
                            </h3>

                            {selectedCell ? (
                                <form onSubmit={saveCellData} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Activity</label>
                                        <input
                                            type="text"
                                            value={editSubject}
                                            onChange={(e) => setEditSubject(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                                        <input
                                            type="text"
                                            value={editTeacher}
                                            onChange={(e) => setEditTeacher(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room / Notes</label>
                                        <input
                                            type="text"
                                            value={editRoom}
                                            onChange={(e) => setEditRoom(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCell(null)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-sm text-gray-500">Click on any cell in the grid to assign a class, teacher, or activity.</p>
                            )}
                        </div>

                        {/* Time Slots Config */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-900">Time Slots</h3>
                                <button onClick={addTimeSlot} data-testid="add-slot-btn" className="text-blue-600 hover:text-blue-700">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                {timeSlots.map((slot, idx) => (
                                    <div key={slot.id} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-gray-500">Slot {idx + 1}</span>
                                            <button onClick={() => removeTimeSlot(slot.id)} className="text-red-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="time"
                                                value={slot.start}
                                                onChange={(e) => {
                                                    const newSlots = [...timeSlots];
                                                    newSlots[idx].start = e.target.value;
                                                    setTimeSlots(newSlots);
                                                }}
                                                className="w-full p-1 text-sm border rounded"
                                            />
                                            <span className="text-gray-400">-</span>
                                            <input
                                                type="time"
                                                value={slot.end}
                                                onChange={(e) => {
                                                    const newSlots = [...timeSlots];
                                                    newSlots[idx].end = e.target.value;
                                                    setTimeSlots(newSlots);
                                                }}
                                                className="w-full p-1 text-sm border rounded"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <input
                                                type="checkbox"
                                                id={`break-${slot.id}`}
                                                checked={slot.type === 'break'}
                                                onChange={() => toggleBreak(slot.id)}
                                                className="rounded text-blue-600"
                                            />
                                            <label htmlFor={`break-${slot.id}`} className="text-xs text-gray-600">Is Break / Lunch?</label>
                                        </div>
                                        {slot.type === 'break' && (
                                            <input
                                                type="text"
                                                value={slot.label || ''}
                                                onChange={(e) => {
                                                    const newSlots = [...timeSlots];
                                                    newSlots[idx].label = e.target.value;
                                                    setTimeSlots(newSlots);
                                                }}
                                                placeholder="Break Label (e.g. Lunch)"
                                                className="w-full p-1 text-sm border rounded mt-1"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-9">
                        <div className="bg-white shadow-lg print:shadow-none p-8 min-h-[800px] print:min-h-0 print:p-0">

                            {/* Timetable Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
                            </div>

                            {/* Timetable Grid */}
                            <div className="border-2 border-gray-800">
                                {/* Header Row: Days */}
                                <div className="grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
                                    <div className="border-b border-r border-gray-300 p-4 bg-gray-50 print:bg-white"></div>
                                    {days.map(day => (
                                        <div key={day} className="border-b border-r border-gray-300 p-4 text-center font-bold text-xl bg-gray-50 print:bg-white last:border-r-0">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Rows: Time Slots */}
                                {timeSlots.map((slot, slotIndex) => (
                                    <div key={slot.id} className="grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
                                        {/* Time Column */}
                                        <div className="border-b border-r border-gray-300 p-2 flex flex-col justify-center items-center text-center bg-gray-50 print:bg-white">
                                            <span className="font-bold text-lg">{slotIndex + 1}</span>
                                            <span className="text-xs text-gray-500 mt-1">{slot.start} - {slot.end}</span>
                                        </div>

                                        {/* Content Columns */}
                                        {slot.type === 'break' ? (
                                            // Break Row - Spans all columns
                                            <div
                                                className="border-b border-gray-300 flex items-center justify-center bg-gray-100 print:bg-gray-50"
                                                style={{ gridColumn: `2 / span ${days.length}` }}
                                            >
                                                <span className="text-xl text-gray-600 font-medium tracking-widest uppercase">{slot.label}</span>
                                            </div>
                                        ) : (
                                            // Regular Cells
                                            days.map((day, dayIndex) => {
                                                const key = `${dayIndex}-${slotIndex}`;
                                                const data = gridData[key];
                                                const isSelected = selectedCell?.key === key;

                                                return (
                                                    <div
                                                        key={key}
                                                        data-testid={`cell-${dayIndex}-${slotIndex}`}
                                                        onClick={() => handleCellClick(dayIndex, slotIndex)}
                                                        className={`border-b border-r border-gray-300 p-2 min-h-[100px] relative cursor-pointer hover:bg-blue-50 transition-colors last:border-r-0 ${isSelected ? 'bg-blue-50 ring-2 ring-inset ring-blue-400' : ''}`}
                                                    >
                                                        {data ? (
                                                            <div className="h-full flex flex-col justify-between text-center">
                                                                <div className="font-medium text-lg text-gray-900 leading-tight pt-2">
                                                                    {data.subject}
                                                                </div>
                                                                <div className="flex justify-between items-end mt-2 text-xs text-gray-500 font-medium">
                                                                    <span>{data.room}</span>
                                                                    <span>{data.teacher}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center opacity-0 hover:opacity-100">
                                                                <Plus className="w-6 h-6 text-gray-300" />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center text-sm text-gray-400 print:hidden">
                                <p>Tip: Click on any cell to edit its content. Use the sidebar to add/remove time slots.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: landscape;
                        margin: 0.5cm;
                    }
                    body {
                        background: white;
                    }
                }
            `}</style>
        </div>
    );
}
