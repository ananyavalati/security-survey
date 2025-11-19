// Import the official Supabase helper function `createClient` from the Supabase library.
// renamed it to avoid conflict
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Our own helper function to create a Supabase client for this app.
 * Anywhere in the app that needs to talk to Supabase can call createClient().
 */
export function createClient() {
    // Read the Supabase URL from the environment variables.
    // `?? ''` means: if it's null or undefined, fall back to an empty string.
  const supabase_url = import.meta.env.VITE_SUPABASE_URL ?? ''
  const supabase_key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

  // Use the official Supabase function to build a client using your URL and key.
  // This client object is what you use to call supabase.auth, supabase.from(...)
  return createSupabaseClient(supabase_url, supabase_key)
}
