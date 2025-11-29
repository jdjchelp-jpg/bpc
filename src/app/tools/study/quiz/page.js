'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function QuizGenerator() {
    const [input, setInput] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [user, setUser] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateQuiz = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);
        setQuiz(null);

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
                            content: `You are a quiz generator. Create a 5-question multiple choice quiz based on the user's text.
              Return ONLY a JSON object with this structure:
              {
                "title": "Quiz Title",
                "questions": [
                  {
                    "question": "Question text?",
                    "options": ["A", "B", "C", "D"],
                    "correctIndex": 0
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

            const generatedQuiz = JSON.parse(content);
            setQuiz(generatedQuiz);
            setAnswers({});
            setShowResults(false);
            setScore(0);

        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate quiz. ' + (error.message || ''));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleOptionSelect = (qIndex, oIndex) => {
        if (showResults) return;
        setAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
    };

    const submitQuiz = () => {
        let newScore = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctIndex) {
                newScore++;
            }
        });
        setScore(newScore);
        setShowResults(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/study" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Study Tools
                </Link>

                {!quiz ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-blue-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Generator</h1>
                            <p className="text-gray-600">Test your knowledge. Paste your notes to generate a custom quiz.</p>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your study material here..."
                            className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
                        />

                        <button
                            onClick={generateQuiz}
                            disabled={!input.trim() || isGenerating}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all ${!input.trim() || isGenerating
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Generating Quiz...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Create Quiz
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-blue-50 p-6 border-b border-blue-100">
                            <h2 className="text-2xl font-bold text-blue-900">{quiz.title}</h2>
                            {showResults && (
                                <div className="mt-2 text-blue-800 font-medium">
                                    Score: {score} / {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
                                </div>
                            )}
                        </div>

                        <div className="p-8 space-y-8">
                            {quiz.questions.map((q, qIdx) => (
                                <div key={qIdx} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                    <p className="text-lg font-bold text-gray-900 mb-4">{qIdx + 1}. {q.question}</p>
                                    <div className="space-y-3">
                                        {q.options.map((opt, oIdx) => {
                                            const isSelected = answers[qIdx] === oIdx;
                                            const isCorrect = q.correctIndex === oIdx;

                                            let btnClass = "border-gray-200 hover:bg-gray-50";
                                            if (showResults) {
                                                if (isCorrect) btnClass = "bg-green-100 border-green-300 text-green-800";
                                                else if (isSelected) btnClass = "bg-red-100 border-red-300 text-red-800";
                                                else btnClass = "opacity-50";
                                            } else if (isSelected) {
                                                btnClass = "bg-blue-100 border-blue-300 text-blue-800";
                                            }

                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => handleOptionSelect(qIdx, oIdx)}
                                                    disabled={showResults}
                                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${btnClass}`}
                                                >
                                                    <span>{opt}</span>
                                                    {showResults && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                    {showResults && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                            <button
                                onClick={() => { setQuiz(null); setInput(''); }}
                                className="text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Start Over
                            </button>

                            {!showResults && (
                                <button
                                    onClick={submitQuiz}
                                    disabled={Object.keys(answers).length < quiz.questions.length}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
