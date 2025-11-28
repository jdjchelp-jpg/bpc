import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcgkpcbfiwvxgnmwwked.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZ2twY2JmaXd2eGdubXd3a2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTUyMDAsImV4cCI6MjA3OTgzMTIwMH0.vPdpBqCwi4i9gaapZGKts8WwlbqpigpW4EyQGeHu_gg'

const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables', { supabaseUrl, supabaseAnonKey })
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()
