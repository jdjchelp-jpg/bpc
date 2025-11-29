import { NextResponse } from 'next/server'

export async function GET() {
    const hasApiKey = !!process.env.OPENROUTER_API_KEY
    const apiKeyPreview = process.env.OPENROUTER_API_KEY
        ? `${process.env.OPENROUTER_API_KEY.substring(0, 10)}...`
        : 'NOT SET'

    return NextResponse.json({
        status: 'OK',
        environment: process.env.NODE_ENV,
        hasOpenRouterKey: hasApiKey,
        apiKeyPreview: apiKeyPreview,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
}
