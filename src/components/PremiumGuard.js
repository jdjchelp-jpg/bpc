'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { isPremiumUser } from '@/lib/premium';
import Link from 'next/link';
import { Lock, Loader2 } from 'lucide-react';

export default function PremiumGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (isPremiumUser(user)) {
                setHasAccess(true);
            }
        } catch (error) {
            console.error('Error checking premium status:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500">Verifying access...</p>
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-red-100 p-4 rounded-full mb-6">
                    <Lock className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Feature</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    This tool is available exclusively to premium members. Please upgrade your account to access it.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/pricing"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Upgrade Now
                    </Link>
                    <Link
                        href="/tools"
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Back to Tools
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
