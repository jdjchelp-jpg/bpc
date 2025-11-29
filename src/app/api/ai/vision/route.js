import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const body = await req.json()
        const { imageUrl, prompt, model } = body

        // Verify Authentication
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check Premium Status
        const premiumEmails = ['jdjchelp@gmail.com', 'simonejohnson840@gmail.com']
        if (!premiumEmails.includes(user.email)) {
            return NextResponse.json({ error: 'Premium access required' }, { status: 403 })
        }

        const apiKey = process.env.OPENROUTER_API_KEY
        const siteUrl = 'https://bpc-nu.vercel.app/'
        const siteName = 'BPC'

        // Use vision model (from user's snippet: openai/gpt-oss-20b:free)
        const visionModel = model || 'openai/gpt-4o-mini:free' // gpt-4o-mini supports vision and is free

        const messages = [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: prompt || 'What do you see in this image?'
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: imageUrl
                        }
                    }
                ]
            }
        ]

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": siteUrl,
                "X-Title": siteName,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: visionModel,
                messages: messages
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('OpenRouter Vision API Error:', errorData)
            return NextResponse.json({ error: 'AI Vision Service Error', details: errorData }, { status: response.status })
        }

        const result = await response.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Vision API Route Error:', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}
