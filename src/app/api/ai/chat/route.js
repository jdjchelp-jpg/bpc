import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const body = await req.json()
        const { messages, model } = body

        // Verify Authentication
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        // Get JWT from header
        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized - No auth header' }, { status: 401 })
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            console.error('Auth error:', authError)
            return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 })
        }

        // Check Premium Status
        const premiumEmails = ['jdjchelp@gmail.com', 'simonejohnson840@gmail.com']
        if (!premiumEmails.includes(user.email)) {
            return NextResponse.json({ error: 'Premium access required' }, { status: 403 })
        }

        const apiKey = process.env.OPENROUTER_API_KEY
        const siteUrl = 'https://bpc-nu.vercel.app/'
        const siteName = 'BPC'

        // Validate API key
        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is not set')
            return NextResponse.json({
                error: 'Configuration Error',
                message: 'API key not configured'
            }, { status: 500 })
        }

        // Prepare API call
        const isReasoningModel = model === 'x-ai/grok-4.1-fast:free'

        const payload = {
            model: model,
            messages: messages,
            ...(isReasoningModel && { reasoning: { enabled: true } })
        }

        console.log('Calling OpenRouter with model:', model)

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": siteUrl,
                "X-Title": siteName,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('OpenRouter API Error:', errorData)
            return NextResponse.json({
                error: 'AI Service Error',
                message: errorData.error?.message || 'Unknown API error',
                details: errorData
            }, { status: response.status })
        }

        const result = await response.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('API Route Error:', error)
        console.error('Error stack:', error.stack)
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 })
    }
}
