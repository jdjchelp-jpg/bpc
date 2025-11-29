'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Calendar, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function Scheduler() {
    const [reminders, setReminders] = useState([]);
    const [newText, setNewText] = useState('');
    const [newTime, setNewTime] = useState('');
    const [permission, setPermission] = useState('default');

    useEffect(() => {
        // Check notification permission
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }

        // Load saved reminders
        const saved = localStorage.getItem('smart_scheduler');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Filter out past reminders or keep them? Let's keep them but mark as done if passed
            setReminders(parsed);
        }

        // Check for due reminders every minute
        const interval = setInterval(checkReminders, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('smart_scheduler', JSON.stringify(reminders));
    }, [reminders]);

    const requestPermission = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
        }
    };

    const checkReminders = () => {
        const now = new Date();
        reminders.forEach(reminder => {
            if (!reminder.notified && new Date(reminder.time) <= now) {
                sendNotification(reminder);
                markAsNotified(reminder.id);
            }
        });
    };

    const sendNotification = (reminder) => {
        if (permission === 'granted') {
            new Notification('Reminder', {
                body: reminder.text,
                icon: '/favicon.ico' // Assuming standard favicon
            });
        } else {
            alert(`Reminder: ${reminder.text}`);
        }
    };

    const markAsNotified = (id) => {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, notified: true } : r));
    };

    const addReminder = (e) => {
        e.preventDefault();
        if (!newText || !newTime) return;

        const reminder = {
            id: Date.now(),
            text: newText,
            time: newTime, // ISO string from input type="datetime-local"
            notified: false,
            createdAt: new Date().toISOString()
        };

        setReminders([...reminders, reminder].sort((a, b) => new Date(a.time) - new Date(b.time)));
        setNewText('');
        setNewTime('');
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                        <div className="p-8 border-b border-gray-100 bg-purple-50 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-purple-900 mb-2">Smart Scheduler</h1>
                                <p className="text-purple-700">Plan your notifications.</p>
                            </div>
                            {permission !== 'granted' && (
                                <button
                                    onClick={requestPermission}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors text-sm"
                                >
                                    Enable Notifications
                                </button>
                            )}
                        </div>

                        <div className="p-8 flex-1 bg-gray-50">
                            {/* Add Form */}
                            <form onSubmit={addReminder} className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-purple-100 flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Text</label>
                                    <input
                                        type="text"
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                        placeholder="Meeting with team..."
                                        className="w-full p-3 border border-gray-200 rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-64">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <input
                                        type="datetime-local"
                                        value={newTime}
                                        onChange={(e) => setNewTime(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </form>

                            {/* List */}
                            <div className="space-y-4">
                                {reminders.length === 0 && (
                                    <div className="text-center text-gray-400 py-12">
                                        <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No reminders scheduled.</p>
                                    </div>
                                )}

                                {reminders.map((reminder) => {
                                    const isPast = new Date(reminder.time) < new Date();
                                    return (
                                        <div
                                            key={reminder.id}
                                            className={`p-4 rounded-xl border flex justify-between items-center transition-all ${reminder.notified
                                                    ? 'bg-gray-100 border-gray-200 opacity-75'
                                                    : isPast
                                                        ? 'bg-red-50 border-red-100'
                                                        : 'bg-white border-gray-200 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full ${reminder.notified ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                                                    {reminder.notified ? <CheckCircle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold ${reminder.notified ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                                        {reminder.text}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {new Date(reminder.time).toLocaleString()}
                                                        {isPast && !reminder.notified && <span className="ml-2 text-red-500 font-bold text-xs flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</span>}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteReminder(reminder.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
