'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Sparkles, Loader2, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function InteractiveLessons() {
    const [input, setInput] = useState('');
    const [lesson, setLesson] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [user, setUser] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateLesson = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);
        setLesson(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                alert('Please log in to use AI features.');
                setIsGenerating(false);
                return;
            }

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an interactive lesson generator. Create a short 3-5 step lesson based on the user's text.
              Return ONLY a JSON object with this structure:
              {
                "title": "Lesson Title",
                "steps": [
                  {
                    "title": "Step Title",
                    "content": "Explanation text...",
                    "quiz": {
                      "question": "Question related to this step?",
                      "options": ["Option A", "Option B", "Option C"],
                      "correctIndex": 0
                    }
                  }
                ]
              }`
                        },
                        {
                            role: 'user',
                            content: input
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            let content = data.choices[0].message.content;
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();

            const generatedLesson = JSON.parse(content);
            setLesson(generatedLesson);
            setCurrentStep(0);
            setQuizAnswers({});
            setShowFeedback(false);

        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate lesson. ' + (error.message || ''));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleOptionSelect = (optionIndex) => {
        setQuizAnswers(prev => ({ ...prev, [currentStep]: optionIndex }));
        setShowFeedback(true);
    };

    const nextStep = () => {
        if (currentStep < lesson.steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setShowFeedback(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/study" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Study Tools
                </Link>

                {!lesson ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="w-8 h-8 text-orange-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Lessons</h1>
                            <p className="text-gray-600">Paste any text, notes, or topic to generate a step-by-step interactive lesson.</p>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your study material here..."
                            className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none mb-6"
                        />

                        <button
                            onClick={generateLesson}
                            disabled={!input.trim() || isGenerating}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all ${!input.trim() || isGenerating
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Creating Lesson...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Start Learning
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
                        {/* Header */}
                        <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-orange-900">{lesson.title}</h2>
                                <p className="text-orange-700 text-sm">Step {currentStep + 1} of {lesson.steps.length}</p>
                            </div>
                            <div className="w-32 h-2 bg-orange-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{lesson.steps[currentStep].title}</h3>
                            <div className="prose prose-orange max-w-none mb-8 text-gray-700 leading-relaxed">
                                {lesson.steps[currentStep].content}
                            </div>

                            {/* Mini Quiz */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
                                    Quick Check
                                </h4>
                                <p className="text-gray-800 mb-4 font-medium">{lesson.steps[currentStep].quiz.question}</p>
                                <div className="space-y-3">
                                    {lesson.steps[currentStep].quiz.options.map((option, idx) => {
                                        const isSelected = quizAnswers[currentStep] === idx;
                                        const isCorrect = idx === lesson.steps[currentStep].quiz.correctIndex;
                                        let btnClass = "bg-white border-gray-200 hover:bg-gray-50";

                                        if (showFeedback) {
                                            if (isCorrect) btnClass = "bg-green-100 border-green-300 text-green-800";
                                            else if (isSelected) btnClass = "bg-red-100 border-red-300 text-red-800";
                                            else btnClass = "bg-white border-gray-200 opacity-50";
                                        } else if (isSelected) {
                                            btnClass = "bg-orange-100 border-orange-300 text-orange-800";
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => !showFeedback && handleOptionSelect(idx)}
                                                disabled={showFeedback}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${btnClass}`}
                                            >
                                                <span>{option}</span>
                                                {showFeedback && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <button
                                onClick={() => { setLesson(null); setInput(''); }}
                                className="text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Exit Lesson
                            </button>

                            {showFeedback && quizAnswers[currentStep] === lesson.steps[currentStep].quiz.correctIndex && (
                                <button
                                    onClick={nextStep}
                                    disabled={currentStep === lesson.steps.length - 1}
                                    className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-orange-500/30 transition-all"
                                >
                                    {currentStep === lesson.steps.length - 1 ? 'Finish Lesson' : 'Next Step'}
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
