'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { isPremiumUser } from '@/lib/auth'

const AuthContext = createContext({
    user: null,
    isPremium: false,
    loading: true,
    signOut: () => { }
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isPremium, setIsPremium] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                isPremiumUser(session.user.email).then(setIsPremium)
            }
            setLoading(false)
        })

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                isPremiumUser(session.user.email).then(setIsPremium)
            } else {
                setIsPremium(false)
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const value = {
        user,
        isPremium,
        loading,
        signOut: () => supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
