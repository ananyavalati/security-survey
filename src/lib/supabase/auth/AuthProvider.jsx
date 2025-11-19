import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '../client'

// Make a shared “box” that will hold two things: user and loading state
const AuthContext = createContext({ user: null, loading: true })

// This will wrap entire app and provide user + loading to it
export function AuthProvider({ children }) {
  // Create a Supabase client once, and reuse it.
  // useMemo with [] means: only call createClient() the first time this component is used.
  const supabase = useMemo(() => createClient(), [])

  // user: stores the current logged in user object, or null if not logged in.
  const [user, setUser] = useState(null)

  // loading: true while we check if there's a logged in user
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // isMounted is a flag to track if this component is still on screen.
    // It helps avoid setting state after the component is unmounted.
    let isMounted = true

     // This function checks with Supabase to see if there is already a logged in user.
    async function loadSession() {
      const { data, error } = await supabase.auth.getSession()

      // Only update state if this component is still mounted.
      if (isMounted) {
        
        // If there was an error, user is null.
        // If no error, try to read data.session.user.
        // ?. and ?? null mean: safely access user and fall back to null if it is missing.
        setUser(error ? null : data.session?.user ?? null)

        // finished checking, so loading is now false.
        setLoading(false)
      }
    }

    // Listen for changes in the auth state.
    // This runs whenever the user logs in, logs out, or the session changes.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Run the first session check as soon as the provider is mounted.
    loadSession()

    // Cleanup function that runs when AuthProvider is about to be removed.
    return () => {
      isMounted = false       // Mark that the component is no longer mounted.
      sub.subscription.unsubscribe() // Stop listening to auth state changes.
    }
  }, [supabase])

//Share user and loading with everything wrapped inside this provider.
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
// Custom hook so other components can easily read { user, loading }.
export function useAuth() {
  return useContext(AuthContext)
}

// <AuthContext.Provider ...> -> sets and provides { user, loading } to the app.
// useAuth() -> accesses { user, loading } from that Provider inside any component.