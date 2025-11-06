import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabase_url = process.env.VITE_SUPABASE_URL ?? ''
  const supabase_key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ''

  return createSupabaseClient(supabase_url, supabase_key)
}
