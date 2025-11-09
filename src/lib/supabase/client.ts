import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabase_url = import.meta.env.VITE_SUPABASE_URL ?? ''
  const supabase_key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

  return createSupabaseClient(supabase_url, supabase_key)
}
