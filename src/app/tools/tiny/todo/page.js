'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Check, Square } from 'lucide-react';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tiny_todo');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    }, []);

    useEffect(() => {
        localStorage.setItem('tiny_todo', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(t => !t.completed));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools/tiny" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Tiny Apps
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-8 border-b border-gray-100 bg-green-50">
                        <h1 className="text-3xl font-bold text-green-900 mb-2">To-Do List</h1>
                        <p className="text-green-700">Stay organized and get things done.</p>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                        <form onSubmit={addTask} className="flex gap-2 mb-8">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Add a new task..."
                                className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </form>

                        <div className="space-y-3 flex-1">
                            {tasks.length === 0 && (
                                <div className="text-center text-gray-400 py-12">
                                    <p>No tasks yet. Add one above!</p>
                                </div>
                            )}
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`flex items-center p-4 rounded-xl border transition-all ${task.completed
                                            ? 'bg-gray-50 border-gray-100'
                                            : 'bg-white border-gray-200 hover:border-green-300 shadow-sm'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`mr-4 p-1 rounded-full transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
                                            }`}
                                    >
                                        {task.completed ? <Check className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                                    </button>
                                    <span className={`flex-1 text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                        {task.text}
                                    </span>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {tasks.some(t => t.completed) && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={clearCompleted}
                                    className="text-sm text-gray-500 hover:text-red-500 underline"
                                >
                                    Clear Completed Tasks
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
