import { supabase } from './supabase'

export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function isPremiumUser(email) {
    const premiumEmails = ['jdjchelp@gmail.com', 'simonejohnson840@gmail.com']
    return premiumEmails.includes(email)
}

export async function checkPremiumStatus() {
    const user = await getCurrentUser()
    if (!user) return false
    return await isPremiumUser(user.email)
}
